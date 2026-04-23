import InvoiceCard from "./InvoiceCard";
import InvoiceCardMd from "./InvoiceCardMd";
import InvoicesEmptyState from "./InvoicesEmptyState";

import type { Invoice } from "../types/invoice.types";

type InvoiceContainerProps = {
	invoices: Invoice[];
	totalStoredCount: number;
};

export default function InvoiceContainer({
	invoices,
	totalStoredCount,
}: InvoiceContainerProps) {
	if (totalStoredCount === 0) {
		return (
			<section className="flex min-h-[70dvh] justify-center">
				<InvoicesEmptyState />
			</section>
		);
	}

	if (invoices.length === 0) {
		return (
			<section className="flex min-h-[40dvh] justify-center px-4">
				<p className="self-center text-center text-sm text-muted-blue dark:text-muted">
					No invoices match this filter.
				</p>
			</section>
		);
	}

	return (
		<section className="flex min-h-[70dvh] justify-center">
			{/* Mobile */}
			<div className="flex flex-col gap-4 md:hidden">
				{invoices.map((invoice) => (
					<InvoiceCard key={invoice.id} invoice={invoice} />
				))}
			</div>
			{/* Desktop */}
			<div className="hidden w-full flex-col gap-4 md:flex">
				{invoices.map((invoice) => (
					<InvoiceCardMd key={invoice.id} invoice={invoice} />
				))}
			</div>
		</section>
	);
}
