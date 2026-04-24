import FormSection from "../form/FormSection";
import PillButton from "../PillButton";
import type { InvoiceFormValues } from "../../utils/invoicePayload";
import type { ItemValidationErrors } from "../../types/invoiceForm.types";
import ItemRow from "./ItemRow";
import { AnimatePresence, motion } from "motion/react";

type ItemListSectionProps = {
	items: InvoiceFormValues["items"];
	itemErrors: ItemValidationErrors[];
	formErrors: string[];
	onItemChange: (
		index: number,
		patch: Partial<InvoiceFormValues["items"][0]>,
	) => void;
	onRemoveItem: (index: number) => void;
	onAddItem: () => void;
};

export default function ItemListSection({
	items,
	itemErrors,
	formErrors,
	onItemChange,
	onRemoveItem,
	onAddItem,
}: ItemListSectionProps) {
	return (
		<FormSection title="Item List">
			<div className="flex flex-col gap-6">
				<AnimatePresence initial={false}>
					{items.map((row, index) => (
						<motion.div
							key={`row-${index}`}
							layout
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -6 }}
							transition={{ duration: 0.18, ease: "easeOut" }}
						>
							<ItemRow
								row={row}
								index={index}
								onChange={(patch) => onItemChange(index, patch)}
								onRemove={() => onRemoveItem(index)}
								canRemove={items.length > 1}
								nameError={itemErrors[index]?.name}
								quantityError={itemErrors[index]?.quantity}
								priceError={itemErrors[index]?.price}
							/>
						</motion.div>
					))}
				</AnimatePresence>
			</div>
			<PillButton
				label="+ Add New Item"
				onClick={onAddItem}
				type="button"
				variant="default"
				className="mt-2 w-full bg-semi-transparent text-muted-blue hover:bg-semi-transparent-hover dark:bg-[#252945] dark:text-muted dark:hover:bg-[#252945]"
			/>
			{formErrors.length > 0 ? (
				<div className="mt-3 space-y-1 text-[10px] font-medium text-danger">
					{formErrors.map((message) => (
						<p key={message}>- {message}</p>
					))}
				</div>
			) : null}
		</FormSection>
	);
}
