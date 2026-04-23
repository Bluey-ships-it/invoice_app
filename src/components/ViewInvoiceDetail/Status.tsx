import Status from "../InvoiceCard/Status";
import type { InvoiceStatus } from "../../types/invoice.types";

type StatusViewProps = {
	status: InvoiceStatus;
};

export default function StatusView({ status }: StatusViewProps) {
	return (
		<div className="w-full md:w-40 h-22.5 flex items-center justify-between rounded-lg not-md:px-6 md:gap-5 md:bg-transparent dark:md:bg-transparent">
			<span>Status</span>
			<Status status={status} />
		</div>
	);
}
