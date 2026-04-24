import ActionBtns from "./ActionBtns";
import { useParams } from "react-router-dom";
import { useInvoices } from "../../context/InvoicesContext";
import StatusView from "./Status";
import InvoiceId from "../InvoiceCard/InvoiceId";
import InvoiceItem from "./InvoiceItem";
import GrandTotal from "./GrandTotal";
import { motion } from "motion/react";

export default function DetailsContainer() {
	const { id } = useParams();
	const { getInvoice } = useInvoices();
	const invoice = id ? getInvoice(id) : undefined;

	if (!invoice) {
		return (
			<p className="mt-8 text-sm text-muted-blue dark:text-muted">
				Invoice not found.
			</p>
		);
	}

	const grandTotal = invoice.itemList.reduce((sum, item) => sum + item.total, 0);

	return (
		<section>
			<motion.div
				className="md:p-8 mt-8 mb-4 md:mb-6 h-22 flex justify-between items-center bg-surface-card dark:bg-surface-card-dark rounded-lg shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.10)]"
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.2, ease: "easeOut" }}
			>
				<StatusView status={invoice.status} />
				<div className="hidden md:block">
					<ActionBtns />
				</div>
			</motion.div>

			<motion.div
				className="bg-surface-card dark:bg-surface-card-dark  p-6 md:p-12 rounded-lg shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.10)]"
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.2, ease: "easeOut", delay: 0.04 }}
			>
				<div className=" text-muted-blue dark:text-muted md:flex md:justify-between">
					<span className="flex flex-col mb-7.5">
						<InvoiceId id={invoice.id} />
						<span className="text-[13px] text-muted-blue ">
							{invoice.projectDescription}
						</span>
					</span>
					<div>
						<address className=" not-italic flex flex-col gap-0 text-[13px] leading-relaxed md:text-right">
							<span>{invoice.billFrom.streetAddress}</span>
							<span>{invoice.billFrom.city}</span>
							<span>{invoice.billFrom.postCode}</span>
							<span>{invoice.billFrom.country}</span>
						</address>
					</div>
				</div>
				<div className="mt-7.5 flex flex-col md:flex-row md:justify-between gap-8 md:gap-25 text-muted-blue dark:text-muted">
					<div className="flex justify-between md:w-1/2">
						<div className="w-1/2">
							<div className="mb-7.5 flex flex-col gap-3">
								<span className="text-[13px]">Invoice Date</span>
								<span className="font-bold text-[15px] text-black dark:text-white">
									{invoice.invoiceDate}
								</span>
							</div>
							<div className="flex flex-col gap-3">
								<span className="text-[13px]">Payment Due</span>
								<span className="font-bold text-[15px] text-black dark:text-white">
									{invoice.paymentDueDate}
								</span>
							</div>
						</div>
						<div className="w-1/2 md:w-auto flex flex-col gap-3">
							<span className="text-[13px]">Bill To</span>
							<div >
								<p className="font-bold text-text-heading dark:text-white">
									{invoice.billTo.clientName}
								</p>
								<address className="not-italic leading-relaxed text-[13px] flex flex-col gap-0">
									<span>{invoice.billTo.streetAddress}</span>
									<span>{invoice.billTo.city}</span>
									<span>{invoice.billTo.postCode}</span>
									<span>{invoice.billTo.country}</span>
								</address>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-3 md:w-1/2">
						<span className="text-[13px]">Sent To</span>
						<span className="text-text-heading dark:text-white font-bold text-[15px]">
							{invoice.billTo.clientEmail}
						</span>
					</div>
				</div>
				<div className="bg-semi-transparent dark:bg-navy rounded-lg  mt-9">
					<div className="hidden md:grid md:grid-cols-4 md:items-center px-8 pt-8">
						<span className="dark:text-white text-text-heading text-[15px] font-bold">
							Item Name
						</span>
						<span className="text-center font-bold text-[#7C7FBF]">QTY.</span>
						<span className="text-center font-bold text-[#7C7FBF]">Price</span>
						<span className="text-right font-bold dark:text-white text-text-heading">
							Total
						</span>
					</div>
					<div className="p-4 md:p-8 flex flex-col gap-6">
						{invoice.itemList.map((item, index) => (
							<InvoiceItem
								items={item}
								key={`${invoice.id}-${item.name}-${index}`}
							/>
						))}
					</div>
					<GrandTotal total={grandTotal} />
				</div>
			</motion.div>
		</section>
	);
}
