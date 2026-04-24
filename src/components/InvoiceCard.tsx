import { useNavigate } from "react-router-dom";
import { type Invoice } from "../types/invoice.types";
import { motion } from "motion/react";
import DueDate from "./InvoiceCard/DueDate";
import InvoiceId from "./InvoiceCard/InvoiceId";
import Name from "./InvoiceCard/Name";
import Status from "./InvoiceCard/Status";

interface Props {
	invoice: Invoice;
}

export default function InvoiceCard({ invoice }: Props) {
	const total = invoice.itemList.reduce((sum, item) => sum + item.total, 0);
	const navigate = useNavigate();
	return (
		<motion.div
			className="bg-surface-card dark:bg-surface-card-dark w-80 h-33.5 rounded-lg shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.10)] p-6 flex flex-col gap-6 cursor-pointer"
			onClick={() => navigate(`/invoices/${invoice.id}`)}
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			whileHover={{ y: -2 }}
			whileTap={{ scale: 0.99 }}
		>
			<div className="flex justify-between">
				<InvoiceId id={invoice.id} />
				<Name name={invoice.billTo.clientName} />
			</div>
			<div className="flex justify-between items-center">
				<div className="flex flex-col gap-2.25">
					<DueDate date={invoice.paymentDueDate} />
					<span className="dark:text-white">
						£ {total.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
					</span>
				</div>
				<Status status={invoice.status} />
			</div>
		</motion.div>
	);
}
