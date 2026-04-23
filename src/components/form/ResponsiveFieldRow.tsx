import type { ReactNode } from "react";

type ResponsiveFieldRowProps = {
	children: ReactNode;
	className?: string;
};

/** Two equal columns from `sm` up; single column on narrow viewports */
export default function ResponsiveFieldRow({
	children,
	className = "",
}: ResponsiveFieldRowProps) {
	return (
		<div
			className={`grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 ${className}`}
		>
			{children}
		</div>
	);
}
