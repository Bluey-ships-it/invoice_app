import Status from "../InvoiceCard/Status";

export default function StatusView({status}) {
	return (
		<div className="w-full md:w-40 h-22.5 flex items-center justify-between rounded-lg not-md:px-6 md:gap-5 md:bg-transparent dark:md:bg-transparent">
			<span>Status</span>
			<Status status={status} />
		</div>
	);
}
