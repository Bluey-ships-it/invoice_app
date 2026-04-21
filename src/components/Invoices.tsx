import invoices from "../constants/data";
import InvoiceCard from "./InvoiceCard";
import InvoiceCardMd from "./InvoiceCardMd";

export default function InvoiceContainer() {
	return (
		<section className="flex justify-center min-h-[70dvh]">
			{/* Mobile */}
			<div className="flex flex-col gap-4 md:hidden">
				{invoices.map((invoice) => (
					<InvoiceCard key={invoice.id} invoice={invoice} />
				))}
			</div>
			{/* Desktop */}
			<div className="hidden md:flex flex-col gap-4 w-full">
				{invoices.map((invoice) => (
					<InvoiceCardMd key={invoice.id} invoice={invoice} />
				))}
			</div>
		</section>
	);
}
