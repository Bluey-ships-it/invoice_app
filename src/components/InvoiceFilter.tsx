import { useEffect, useRef, useState } from "react";
import type { InvoiceStatus } from "../types/invoice.types";
import AngleDown from "./icons/AngleDown";
import AngleUp from "./icons/AngleUp";
import Checkbox from "./icons/Checkbox";

const STATUS_OPTIONS: { value: InvoiceStatus; label: string }[] = [
	{ value: "draft", label: "Draft" },
	{ value: "pending", label: "Pending" },
	{ value: "paid", label: "Paid" },
];

type InvoiceFilterProps = {
	selected: InvoiceStatus[];
	onToggle: (status: InvoiceStatus) => void;
};

export default function InvoiceFilter({
	selected,
	onToggle,
}: InvoiceFilterProps) {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		function handlePointerDown(e: MouseEvent) {
			if (!rootRef.current?.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handlePointerDown);
		return () => document.removeEventListener("mousedown", handlePointerDown);
	}, [open]);

	const isChecked = (status: InvoiceStatus) => selected.includes(status);

	return (
		<div ref={rootRef} className="relative">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				className="flex cursor-pointer items-center gap-4 rounded-lg py-2 text-sm font-bold text-text-heading transition-opacity hover:opacity-80 dark:text-white"
				aria-expanded={open}
				aria-haspopup="listbox"
			>
				<span>
					Filter <span className="hidden md:inline">by status</span>
				</span>
				<span className="inline-flex" aria-hidden>
					{open ? <AngleUp /> : <AngleDown />}
				</span>
			</button>

			{open ? (
				<div
					role="listbox"
					aria-multiselectable
					className="absolute right-0 top-full z-40 mt-4 min-w-[12rem] rounded-lg bg-surface-card p-6 shadow-[0px_10px_20px_rgba(72,84,159,0.15)] dark:bg-surface-card-dark dark:shadow-[0px_10px_20px_rgba(0,0,0,0.25)]"
				>
					<ul className="flex flex-col gap-4">
						{STATUS_OPTIONS.map(({ value, label }) => (
							<li key={value}>
								<label className="flex cursor-pointer items-center gap-4 select-none">
									<input
										type="checkbox"
										className="peer sr-only"
										checked={isChecked(value)}
										onChange={() => onToggle(value)}
									/>
									<span
										className="flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 border-primary bg-semi-transparent peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary dark:bg-navy dark:peer-checked:bg-primary"
										aria-hidden
									>
										{isChecked(value) ? <Checkbox /> : null}
									</span>
									<span className="text-sm font-bold text-text-heading dark:text-white">
										{label}
									</span>
								</label>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	);
}
