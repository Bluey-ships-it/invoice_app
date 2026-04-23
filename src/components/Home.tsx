import { useCallback, useMemo, useState } from "react";
import Invoices from "./Invoices";
import PageHeader from "./PageHeader";
import { useInvoices } from "../context/InvoicesContext";
import type { InvoiceStatus } from "../types/invoice.types";

export default function Home() {
	const { invoices } = useInvoices();
	const [statusFilter, setStatusFilter] = useState<InvoiceStatus[]>([]);

	const toggleStatus = useCallback((status: InvoiceStatus) => {
		setStatusFilter((prev) =>
			prev.includes(status)
				? prev.filter((existing) => existing !== status)
				: [...prev, status],
		);
	}, []);

	const filteredInvoices = useMemo(() => {
		if (statusFilter.length === 0) return invoices;
		return invoices.filter((invoice) => statusFilter.includes(invoice.status));
	}, [invoices, statusFilter]);

	return (
		<div>
			<PageHeader
				displayCount={filteredInvoices.length}
				statusFilterSelected={statusFilter}
				onStatusFilterToggle={toggleStatus}
			/>
			<Invoices invoices={filteredInvoices} totalStoredCount={invoices.length} />
		</div>
	);
}
