import type { InvoiceItem } from "../../types/invoice.types";

export default function InvoiceItem({ items }: { items: InvoiceItem }) {
	return (
		<>
			<div className="flex justify-between items-center md:hidden">
				<div className="flex flex-col gap-2">
					<span className="dark:text-white text-text-heading text-[15px] font-bold">
						{items.name}
					</span>
					<span className="font-bold">
						<span>{items.quantity}</span> x {items.price}
					</span>
				</div>
				<div>
					<span className="font-bold">{items.total}</span>
				</div>
			</div>

			<div className="hidden md:grid md:grid-cols-4 md:items-center">
				<span className="dark:text-white text-text-heading text-[15px] font-bold">
					{items.name}
				</span>
				<span className="text-center font-bold text-[#7C7FBF]">
					{items.quantity}
				</span>
				<span className="text-center font-bold text-[#7C7FBF]">
					{items.price}
				</span>
				<span className="text-right font-bold dark:text-white text-text-heading">
					{items.total}
				</span>
			</div>
		</>
	);
}
