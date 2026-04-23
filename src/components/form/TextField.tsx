import type { HTMLAttributes } from "react";
import FieldLabel from "./FieldLabel";

type TextFieldProps = {
	id: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
	type?: "text" | "email" | "date" | "number";
	placeholder?: string;
	inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
	min?: string;
	step?: string;
	className?: string;
	error?: string;
};

export default function TextField({
	id,
	label,
	value,
	onChange,
	type = "text",
	placeholder,
	inputMode,
	min,
	step,
	className = "",
	error,
}: TextFieldProps) {
	const inputClassName =
		type === "number"
			? `no-number-spinner h-12 w-full rounded-lg border bg-surface-input-dark/5 text-center text-sm font-bold text-text-heading placeholder:font-medium placeholder:text-muted-blue/70 outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 dark:bg-surface-input-dark dark:text-white dark:placeholder:text-muted-blue/70 ${
					error ? "border-danger bg-danger/5" : "border-transparent"
				}`
			: `h-12 w-full rounded-lg border bg-surface-input-dark/5 px-4 text-sm font-bold text-text-heading placeholder:font-medium placeholder:text-muted-blue/70 outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 dark:bg-surface-input-dark dark:text-white dark:placeholder:text-muted-blue/70 ${
					error ? "border-danger bg-danger/5" : "border-transparent"
				}`;

	return (
		<div className={className}>
			<div className="mb-2 flex items-center justify-between gap-3">
				<FieldLabel htmlFor={id} className={`mb-0 ${error ? "text-danger" : ""}`}>
					{label}
				</FieldLabel>
				{error ? (
					<span id={`${id}-error`} className="text-[10px] font-medium text-danger">
						{error}
					</span>
				) : null}
			</div>
			<input
				id={id}
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				inputMode={inputMode}
				min={min}
				step={step}
				aria-invalid={Boolean(error)}
				aria-describedby={error ? `${id}-error` : undefined}
				className={inputClassName}
			/>
		</div>
	);
}
