import InvoiceFilter from "./InvoiceFilter";
import NewInvoiceBtn from "./NewInvoiceBtn";

export default function PageHeader() {
	return (
		<div className="flex justify-between mb-9 md:mb-13.75 lg:mb-16">
			<div className=" ">
				<h1 className="font-bold text-text-heading dark:text-white text-2xl">
					Invoices
				</h1>
				<p className="md:hidden text-xs">7 invoices</p>
				<p className="hidden md:block text-xs text-[13px]">
					There are 7 total invoices
				</p>
			</div>
			<div className="flex gap-4.5 md:gap-8 items-center">
				<InvoiceFilter />
				<NewInvoiceBtn />
			</div>
		</div>
	);
}
