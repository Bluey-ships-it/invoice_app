import type { ReactNode } from "react";
import ModalShell from "../ModalShell";

type FormModalShellProps = {
	title: string;
	onClose: () => void;
	children: ReactNode;
};

export default function FormModalShell({
	title,
	onClose,
	children,
}: FormModalShellProps) {
	return (
		<ModalShell
			onClose={onClose}
			ariaLabelledBy="invoice-form-dialog-title"
			align="start"
			justify="start"
			containerClassName="p-0 lg:pl-0"
			panelClassName="flex h-full w-full max-w-[616px] flex-col overflow-hidden rounded-none bg-surface-card shadow-[0_25px_40px_rgba(0,0,0,0.18)] dark:bg-surface-card-dark lg:max-w-[616px]"
		>
			<header className="flex shrink-0 items-center justify-between gap-4 border-b border-black/5 px-5 py-4 dark:border-white/10 md:px-8 md:py-5">
				<h1
					id="invoice-form-dialog-title"
					className="text-lg font-bold tracking-tight text-text-heading dark:text-white md:text-xl"
				>
					{title}
				</h1>
				<button
					type="button"
					onClick={onClose}
					className="rounded-lg px-3 py-2 text-sm font-bold text-muted-blue dark:text-muted md:hidden"
				>
					Close
				</button>
			</header>
			<div className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 md:px-8 md:py-8">
				{children}
			</div>
		</ModalShell>
	);
}
