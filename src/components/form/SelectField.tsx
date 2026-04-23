import FieldLabel from "./FieldLabel";

type SelectFieldProps<T extends string> = {
	id: string;
	label: string;
	value: T;
	onChange: (value: T) => void;
	options: readonly T[];
	className?: string;
	error?: string;
};

export default function SelectField<T extends string>({
	id,
	label,
	value,
	onChange,
	options,
	className = "",
	error,
}: SelectFieldProps<T>) {
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
			<div className="relative">
				<select
					id={id}
					value={value}
					onChange={(e) => onChange(e.target.value as T)}
					aria-invalid={Boolean(error)}
					aria-describedby={error ? `${id}-error` : undefined}
					className={`h-12 w-full cursor-pointer appearance-none rounded-lg border bg-surface-input-dark/5 px-4 pr-10 text-sm font-bold text-text-heading outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 dark:bg-surface-input-dark dark:text-white ${
						error ? "border-danger bg-danger/5" : "border-transparent"
					}`}
				>
					{options.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
				<span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-blue dark:text-muted">
					▾
				</span>
			</div>
		</div>
	);
}
