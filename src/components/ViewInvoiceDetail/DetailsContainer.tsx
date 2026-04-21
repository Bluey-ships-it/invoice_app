import ActionBtns from "./ActionBtns";
import invoices from "../../constants/data";
import { useParams } from "react-router-dom";
import StatusView from "./Status";
import InvoiceId from "../InvoiceCard/InvoiceId";
import InvoiceItem from "./InvoiceItem";
import GrandTotal from "./GrandTotal";
export default function DetailsContainer() {
	const { id } = useParams();
	const invoice = invoices.find((inv) => inv.id === id);
	return (
		<section>
			<div className="md:p-8 mt-8 mb-4 md:mb-6 h-22 flex justify-between items-center bg-surface-card dark:bg-surface-card-dark rounded-lg shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.10)]">
				<StatusView status={invoice.status} />
				<div className="hidden lg:block">
					<ActionBtns />
				</div>
			</div>
			<div className="bg-surface-card dark:bg-surface-card-dark  p-6 rounded-lg shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.10)]">
				<div className="text-muted-blue dark:text-muted">
					<span className="flex flex-col mb-7.5">
						<InvoiceId id={invoice.id} />
						<span className="text-[13px] text-muted-blue ">
							{invoice.projectDescription}
						</span>
					</span>
					<div>
						<address className=" not-italic flex flex-col gap-0 text-[13px] leading-relaxed">
							<span>{invoice.billFrom.streetAddress}</span>
							<span>{invoice.billFrom.city}</span>
							<span>{invoice.billFrom.postCode}</span>
							<span>{invoice.billFrom.country}</span>
						</address>
					</div>
				</div>
				<div className="mt-7.5 flex flex-col gap-8 text-muted-blue dark:text-muted">
					<div className="flex justify-between">
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
						<div className="w-1/2">
							<span className="text-[13px]">Bill To</span>
							<p className="font-bold text-text-heading dark:text-white">
								{invoice.billTo.clientName}
							</p>
							<address className="not-italic leading-relaxed text-[13px]">
								<span>{invoice.billTo.streetAddress}</span>
								<span>{invoice.billFrom.city}</span>
								<span>{invoice.billTo.postCode}</span>
								<span>{invoice.billTo.country}</span>
							</address>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<span className="text-[13px]">Sent To</span>
						<span className="text-text-heading font-bold text-[15px]">{invoice.billTo.clientEmail}</span>
					</div>
				</div>
				<div className="bg-semi-transparent dark:bg-navy rounded-lg  mt-9">
					<div className="p-4 flex flex-col gap-6">
						{invoice.itemList.map((item) => (
							<InvoiceItem items={item} key={item.name} />
						))}
					</div>
					<GrandTotal />
				</div>
			</div>
		</section>
	);
}
