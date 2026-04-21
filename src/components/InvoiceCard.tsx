import { type Invoice } from "../types/invoice.types";
import DueDate from "./InvoiceCard/DueDate";
import InvoiceId from "./InvoiceCard/InvoiceId";
import Name from "./InvoiceCard/Name";
import Status from "./InvoiceCard/Status";

interface Props {
	invoice: Invoice;
}

export default function InvoiceCard({ invoice }: Props) {
	const total = invoice.itemList.reduce((sum, item) => sum + item.total, 0);
	console.log(invoice.status);
	return (
		<div className="bg-surface-card dark:bg-surface-card-dark w-80 h-33.5 rounded-lg shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.10)] p-6 flex flex-col gap-6">
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
		</div>
	);
}
