import type { ReactNode } from "react";

type FormSectionProps = {
	title: string;
	children: ReactNode;
	className?: string;
};

export default function FormSection({
	title,
	children,
	className = "",
}: FormSectionProps) {
	return (
		<section className={className}>
			<h2 className="mb-6 text-xs font-bold tracking-[0.25px] text-primary">
				{title}
			</h2>
			<div className="flex flex-col gap-6">{children}</div>
		</section>
	);
}
