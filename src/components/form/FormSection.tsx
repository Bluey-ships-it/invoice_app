import type { ReactNode } from "react";
import { motion } from "motion/react";

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
		<motion.section
			className={className}
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.22, ease: "easeOut" }}
		>
			<h2 className="mb-6 text-xs font-bold tracking-[0.25px] text-primary">
				{title}
			</h2>
			<div className="flex flex-col gap-6">{children}</div>
		</motion.section>
	);
}
