import TextField from "../form/TextField";
import { lineItemTotal } from "../../utils/invoicePayload";
import Bin from "../icons/Bin";

export type ItemRowData = {
	name: string;
	quantity: number;
	price: number;
};

type ItemRowProps = {
	row: ItemRowData;
	index: number;
	onChange: (patch: Partial<ItemRowData>) => void;
	onRemove: () => void;
	canRemove: boolean;
	nameError?: string;
	quantityError?: string;
	priceError?: string;
};

export default function ItemRow({
	row,
	index,
	onChange,
	onRemove,
	canRemove,
	nameError,
	quantityError,
	priceError,
}: ItemRowProps) {
	const total = lineItemTotal(row.quantity, row.price);
	const baseId = `item-${index}`;

	return (
		<div className="grid grid-cols-2 gap-4 border-b border-black/5 pb-6 last:border-b-0 last:pb-0 dark:border-white/10 md:grid-cols-[214px_46px_100px_minmax(0,1fr)_32px] md:items-end">
			<div className="col-span-2 min-w-0 md:col-span-1">
				<TextField
					id={`${baseId}-name`}
					label="Item Name"
					value={row.name}
					onChange={(name) => onChange({ name })}
					error={nameError}
					placeholder="e.g. Banner Design"
				/>
			</div>
			<div className="col-span-1 md:col-span-1">
				<TextField
					id={`${baseId}-qty`}
					label="Qty."
					type="number"
					value={Number.isFinite(row.quantity) ? String(row.quantity) : ""}
					onChange={(v) => onChange({ quantity: Math.max(0, Number(v) || 0) })}
					inputMode="numeric"
					min="0"
					step="1"
					error={quantityError}
					placeholder="1"
				/>
			</div>
			<div className="col-span-1 md:col-span-1">
				<TextField
					id={`${baseId}-price`}
					label="Price"
					type="number"
					value={Number.isFinite(row.price) ? String(row.price) : ""}
					onChange={(v) => onChange({ price: Math.max(0, Number(v) || 0) })}
					inputMode="decimal"
					min="0"
					step="0.01"
					error={priceError}
					placeholder="0.00"
				/>
			</div>
			<div className="col-span-1 flex flex-col md:col-span-1">
				<span className="mb-2 block text-xs font-medium text-muted-blue dark:text-muted">
					Total
				</span>
				<div className="flex h-12 items-center text-sm font-bold tabular-nums">
					{total.toFixed(2)}
				</div>
			</div>
			<div className="col-span-1 flex items-end justify-end md:col-span-1 md:justify-center">
				<button
					type="button"
					onClick={onRemove}
					disabled={!canRemove}
					className="flex h-12 w-8 items-center justify-center rounded-lg text-muted-blue transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30 dark:text-muted"
					aria-label="Remove item"
				>
					<Bin/>
				</button>
			</div>
		</div>
	);
}
