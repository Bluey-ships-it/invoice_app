import InvoicesEmptyState from "./InvoicesEmptyState";

export default function Invoices() {
	return (
		<section className="flex justify-center items-center min-h-[70dvh]">
			<InvoicesEmptyState />
		</section>
	);
}
