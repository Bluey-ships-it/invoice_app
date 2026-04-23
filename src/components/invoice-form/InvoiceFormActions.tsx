import PillButton from "../PillButton";

type InvoiceFormActionsProps = {
	mode: "create" | "edit";
	onCancel: () => void;
	onSaveDraft: () => void;
};

export default function InvoiceFormActions({
	mode,
	onCancel,
	onSaveDraft,
}: InvoiceFormActionsProps) {
	if (mode === "create") {
		return (
			<div className="shrink-0 -mx-5 mt-6 flex items-center justify-between  bg-surface-card px-5 py-6 dark:border-white/10 dark:bg-surface-card-dark md:-mx-8 md:px-8">
				<PillButton
					label="Discard"
					onClick={onCancel}
					type="button"
					className="bg-semi-transparent text-muted-blue hover:bg-semi-transparent-hover dark:bg-semi-transparent dark:text-muted-blue dark:hover:bg-semi-transparent-hover"
				/>
				<div className="flex items-center gap-2">
					<PillButton
						label="Save as Draft"
						onClick={onSaveDraft}
						type="button"
						className="bg-surface-input-dark text-white hover:opacity-90"
					/>
					<PillButton label="Save & Send" variant="primary" type="submit" />
				</div>
			</div>
		);
	}

	return (
		<div className="shrink-0 -mx-5 mt-6 flex flex-col-reverse gap-4 border-t border-black/5 bg-surface-card px-5 py-6 dark:border-white/10 dark:bg-surface-card-dark sm:flex-row sm:justify-end md:-mx-8 md:px-8">
			<PillButton
				label="Cancel"
				onClick={onCancel}
				variant="default"
				type="button"
				className="bg-surface-input-dark dark:text-muted dark:hover:opacity-90"
			/>
			<PillButton label="Save Changes" variant="primary" type="submit" />
		</div>
	);
}
