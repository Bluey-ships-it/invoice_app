import type { ReactNode } from "react";

type FieldLabelProps = {
	htmlFor?: string;
	children: ReactNode;
	className?: string;
};

export default function FieldLabel({
	htmlFor,
	children,
	className = "",
}: FieldLabelProps) {
	return (
		<label
			htmlFor={htmlFor}
			className={`mb-2 block text-xs font-medium text-muted-blue dark:text-muted ${className}`}
		>
			{children}
		</label>
	);
}
