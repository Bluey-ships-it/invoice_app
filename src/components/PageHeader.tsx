import type { InvoiceStatus } from "../types/invoice.types";
import InvoiceFilter from "./InvoiceFilter";
import NewInvoiceBtn from "./NewInvoiceBtn";
import { motion } from "motion/react";

type PageHeaderProps = {
	displayCount: number;
	statusFilterSelected: InvoiceStatus[];
	onStatusFilterToggle: (status: InvoiceStatus) => void;
};

export default function PageHeader({
	displayCount,
	statusFilterSelected,
	onStatusFilterToggle,
}: PageHeaderProps) {
	const countLabel =
		displayCount === 1 ? "1 invoice" : `${displayCount} invoices`;
	const filterActive = statusFilterSelected.length > 0;

	return (
		<motion.div
			className="flex justify-between mb-9 md:mb-13.75 lg:mb-16"
			initial={{ opacity: 0, y: 6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
		>
			<div className=" ">
				<h1 className="font-bold text-text-heading dark:text-white text-2xl">
					Invoices
				</h1>
				<p className="md:hidden text-xs text-text-body dark:text-muted">
					{countLabel}
				</p>
				<p className="hidden md:block text-xs text-[13px] text-text-body dark:text-muted">
					{filterActive
						? `There are ${displayCount} matching invoices`
						: `There are ${displayCount} total invoices`}
				</p>
			</div>
			<div className="flex gap-4.5 md:gap-8 items-center">
				<InvoiceFilter
					selected={statusFilterSelected}
					onToggle={onStatusFilterToggle}
				/>
				<NewInvoiceBtn />
			</div>
		</motion.div>
	);
}
