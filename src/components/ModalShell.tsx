import type { ReactNode } from "react";
import { motion } from "motion/react";

type ModalShellProps = {
	open?: boolean;
	onClose: () => void;
	children: ReactNode;
	ariaLabelledBy: string;
	align?: "center" | "start";
	justify?: "center" | "start";
	containerClassName?: string;
	panelClassName?: string;
};

export default function ModalShell({
	open = true,
	onClose,
	children,
	ariaLabelledBy,
	align = "center",
	justify = "center",
	containerClassName = "",
	panelClassName = "",
}: ModalShellProps) {
	if (!open) return null;

	const alignmentClass = align === "start" ? "items-start" : "items-center";
	const justifyClass = justify === "start" ? "justify-start" : "justify-center";

	return (
		<div
			className={`fixed top-18 right-0 bottom-0 left-0 z-[70] lg:top-0 lg:left-25.75 ${containerClassName}`}
			role="dialog"
			aria-modal="true"
			aria-labelledby={ariaLabelledBy}
		>
			<motion.button
				type="button"
				aria-label="Close modal"
				className="absolute inset-0 bg-black/45"
				onClick={onClose}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2, ease: "easeOut" }}
			/>
			<div
				className={`pointer-events-none relative z-10 flex h-full w-full ${alignmentClass} ${justifyClass}`}
			>
				<motion.div
					className={`pointer-events-auto ${panelClassName}`}
					initial={{ opacity: 0, x: -16 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.24, ease: "easeOut" }}
				>
					{children}
				</motion.div>
			</div>
		</div>
	);
}
