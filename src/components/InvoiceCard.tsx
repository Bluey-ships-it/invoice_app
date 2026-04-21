import DueDate from "./InvoiceCard/DueDate";
import InvoiceId from "./InvoiceCard/InvoiceId";
import Name from "./InvoiceCard/Name";
import Status from "./InvoiceCard/Status";

export default function InvoiceCard() {
	return (
		<div className="bg-surface-card dark:bg-surface-card-dark w-80 h-33.5 rounded-lg shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.10)] p-6 flex flex-col gap-6">
			<div className="flex justify-between">
				<InvoiceId />
				<Name />
			</div>
			<div className="flex justify-between items-center ">
				<div className="flex flex-col gap-2.25">
					<DueDate />
					<span className="dark:text-white">$1,800</span>
				</div>
				<Status />
			</div>
		</div>
	);
}
