export type PaymentTerms =
	| "Net 1 Day"
	| "Net 7 Days"
	| "Net 14 Days"
	| "Net 30 Days";

export type InvoiceStatus = "paid" | "pending" | "draft";

export interface Address {
	streetAddress: string;
	city: string;
	postCode: string;
	country: string;
}

export type BillFrom = Address;

export interface BillTo extends Address {
	clientName: string;
	clientEmail: string;
}

export interface InvoiceItem {
	name: string;
	quantity: number;
	price: number;
	total: number;
}

export interface Invoice {
	id: string;
	billFrom: BillFrom;
	billTo: BillTo;
	invoiceDate: string; // ISO 8601 e.g. "2021-08-21"
	paymentDueDate: string; // ISO 8601 e.g. "2021-09-20"
	paymentTerms: PaymentTerms;
	projectDescription: string;
	itemList: InvoiceItem[];
	status: InvoiceStatus;
}
