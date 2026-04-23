import type { Invoice } from "./invoice.types";

export type InvoiceFormProps = {
	mode: "create" | "edit";
	initialInvoice?: Invoice | null;
	onSubmit: (payload: Invoice) => void;
	onCancel: () => void;
};

export type ItemValidationErrors = {
	name?: string;
	quantity?: string;
	price?: string;
};

export type InvoiceFormErrors = {
	fields: Record<string, string>;
	items: ItemValidationErrors[];
	form: string[];
};
