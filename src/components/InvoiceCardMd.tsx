import AngleRight from "./icons/AngleRight";
import DueDate from "./InvoiceCard/DueDate";
import InvoiceId from "./InvoiceCard/InvoiceId";
import Name from "./InvoiceCard/Name";
import Status from "./InvoiceCard/Status";

export default function InvoiceCardMd() {
	return (
		<div className="w-full bg-white dark:bg-surface-card-dark h-16 rounded-lg shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.10)] flex items-center px-6 justify-between">
			<InvoiceId />
			<DueDate />
			<Name />
			<span>$1000</span>
			<Status />
			<AngleRight />
		</div>
	);
}
