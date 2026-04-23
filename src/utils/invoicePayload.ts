import type {
	BillFrom,
	BillTo,
	Invoice,
	InvoiceItem,
	PaymentTerms,
} from "../types/invoice.types";

const PAYMENT_TERMS_DAYS: Record<PaymentTerms, number> = {
	"Net 1 Day": 1,
	"Net 7 Days": 7,
	"Net 14 Days": 14,
	"Net 30 Days": 30,
};

export const PAYMENT_TERMS_OPTIONS: PaymentTerms[] = [
	"Net 1 Day",
	"Net 7 Days",
	"Net 14 Days",
	"Net 30 Days",
];

export function paymentTermsToDays(terms: PaymentTerms): number {
	return PAYMENT_TERMS_DAYS[terms];
}

export function addDaysToISODate(isoDate: string, days: number): string {
	const [y, m, d] = isoDate.split("-").map(Number);
	const utc = Date.UTC(y, m - 1, d);
	const next = new Date(utc + days * 86400000);
	const yy = next.getUTCFullYear();
	const mm = String(next.getUTCMonth() + 1).padStart(2, "0");
	const dd = String(next.getUTCDate()).padStart(2, "0");
	return `${yy}-${mm}-${dd}`;
}

export function lineItemTotal(quantity: number, price: number): number {
	return Math.round(quantity * price * 100) / 100;
}

export function buildInvoiceItems(
	rows: Array<{ name: string; quantity: number; price: number }>,
): InvoiceItem[] {
	return rows.map((row) => {
		const total = lineItemTotal(row.quantity, row.price);
		return {
			name: row.name.trim(),
			quantity: row.quantity,
			price: row.price,
			total,
		};
	});
}

export interface InvoiceFormValues {
	id: string;
	status: Invoice["status"];
	billFrom: BillFrom;
	billTo: BillTo;
	invoiceDate: string;
	paymentTerms: PaymentTerms;
	projectDescription: string;
	items: Array<{ name: string; quantity: number; price: number }>;
}

export function invoiceToFormValues(invoice: Invoice): InvoiceFormValues {
	return {
		id: invoice.id,
		status: invoice.status,
		billFrom: { ...invoice.billFrom },
		billTo: { ...invoice.billTo },
		invoiceDate: invoice.invoiceDate,
		paymentTerms: invoice.paymentTerms,
		projectDescription: invoice.projectDescription,
		items: invoice.itemList.map((i) => ({
			name: i.name,
			quantity: i.quantity,
			price: i.price,
		})),
	};
}

export function emptyBillFrom(): BillFrom {
	return {
		streetAddress: "",
		city: "",
		postCode: "",
		country: "",
	};
}

export function emptyBillTo(): BillTo {
	return {
		...emptyBillFrom(),
		clientName: "",
		clientEmail: "",
	};
}

const ID_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/** Six-character id in the same family as `XM9141`, `RT3080`, etc. */
export function generateInvoiceId(): string {
	const bytes = new Uint8Array(6);
	crypto.getRandomValues(bytes);
	let id = "";
	for (let i = 0; i < 6; i++) {
		id += ID_CHARS[bytes[i]! % ID_CHARS.length]!;
	}
	return id;
}

export function defaultCreateFormValues(): InvoiceFormValues {
	return {
		id: generateInvoiceId(),
		status: "draft",
		billFrom: emptyBillFrom(),
		billTo: emptyBillTo(),
		invoiceDate: new Date().toISOString().slice(0, 10),
		paymentTerms: "Net 30 Days",
		projectDescription: "",
		items: [{ name: "", quantity: 1, price: 0 }],
	};
}

/** Shape matches `Invoice` in constants/data.ts */
export function formValuesToInvoicePayload(values: InvoiceFormValues): Invoice {
	const days = paymentTermsToDays(values.paymentTerms);
	const paymentDueDate = addDaysToISODate(values.invoiceDate, days);
	const itemList = buildInvoiceItems(values.items);

	return {
		id: values.id,
		status: values.status,
		billFrom: { ...values.billFrom },
		billTo: { ...values.billTo },
		invoiceDate: values.invoiceDate,
		paymentDueDate,
		paymentTerms: values.paymentTerms,
		projectDescription: values.projectDescription.trim(),
		itemList,
	};
}
