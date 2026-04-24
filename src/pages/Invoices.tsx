import { useCallback, useMemo, useState } from "react";
import { motion } from "motion/react";
import InvoiceContainer from "../components/Invoices";
import PageHeader from "../components/PageHeader";
import { useInvoices } from "../context/InvoicesContext";
import type { InvoiceStatus } from "../types/invoice.types";

export default function Invoices() {
	const { invoices } = useInvoices();
	const [statusFilter, setStatusFilter] = useState<InvoiceStatus[]>([]);

	const toggleStatus = useCallback((status: InvoiceStatus) => {
		setStatusFilter((prev) =>
			prev.includes(status)
				? prev.filter((s) => s !== status)
				: [...prev, status],
		);
	}, []);

	const filteredInvoices = useMemo(() => {
		if (statusFilter.length === 0) return invoices;
		return invoices.filter((inv) => statusFilter.includes(inv.status));
	}, [invoices, statusFilter]);

	return (
		<motion.section
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
		>
			<PageHeader
				displayCount={filteredInvoices.length}
				statusFilterSelected={statusFilter}
				onStatusFilterToggle={toggleStatus}
			/>
			<InvoiceContainer
				invoices={filteredInvoices}
				totalStoredCount={invoices.length}
			/>
		</motion.section>
	);
}
