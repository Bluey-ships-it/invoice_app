import { useNavigate } from "react-router-dom";
import { type Invoice } from "../types/invoice.types";
import { motion } from "motion/react";
import AngleRight from "./icons/AngleRight";
import DueDate from "./InvoiceCard/DueDate";
import InvoiceId from "./InvoiceCard/InvoiceId";
import Name from "./InvoiceCard/Name";
import Status from "./InvoiceCard/Status";

interface Props {
	invoice: Invoice;
}

export default function InvoiceCardMd({ invoice }: Props) {
	const total = invoice.itemList.reduce((sum, item) => sum + item.total, 0);
	const navigate = useNavigate();
	return (
		<motion.div
			className="w-full bg-white dark:bg-surface-card-dark h-16 rounded-lg shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.10)] cursor-pointer flex items-center px-6 justify-between"
			onClick={() => navigate(`/invoices/${invoice.id}`)}
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			whileHover={{ y: -2 }}
			whileTap={{ scale: 0.995 }}
		>
			<InvoiceId id={invoice.id} />
			<DueDate date={invoice.paymentDueDate} />
			<Name name={invoice.billTo.clientName} />
			<span className="text-[13px] md:w-20 md:text-right">
				£ {total.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
			</span>
			<Status status={invoice.status} />
			<AngleRight />
		</motion.div>
	);
}
