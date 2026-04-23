import type { ReactNode } from "react";
import PillButton from "./PillButton";
import ModalShell from "./ModalShell";

type ConfirmDialogProps = {
	open: boolean;
	title: string;
	children: ReactNode;
	cancelLabel?: string;
	confirmLabel?: string;
	confirmVariant?: "danger" | "primary";
	onCancel: () => void;
	onConfirm: () => void;
};

export default function ConfirmDialog({
	open,
	title,
	children,
	cancelLabel = "Cancel",
	confirmLabel = "Confirm",
	confirmVariant = "danger",
	onCancel,
	onConfirm,
}: ConfirmDialogProps) {
	if (!open) return null;

	return (
		<ModalShell
			onClose={onCancel}
			ariaLabelledBy="confirm-dialog-title"
			containerClassName="z-[90] p-4"
			panelClassName="w-full max-w-md rounded-lg bg-surface-card p-8 shadow-[0px_10px_20px_rgba(72,84,159,0.25)] dark:bg-surface-card-dark"
		>
			<h2
				id="confirm-dialog-title"
				className="text-lg font-bold text-text-heading dark:text-white"
			>
				{title}
			</h2>
			<div className="mt-3 text-sm leading-relaxed text-muted-blue dark:text-muted">
				{children}
			</div>
			<div className="mt-8 flex flex-col-reverse justify-end gap-4 sm:flex-row">
				<PillButton label={cancelLabel} variant="default" onClick={onCancel} />
				<PillButton
					label={confirmLabel}
					variant={confirmVariant}
					onClick={onConfirm}
				/>
			</div>
		</ModalShell>
	);
}
