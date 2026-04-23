import type { Invoice } from "../types/invoice.types";
import type {
	InvoiceFormErrors,
	ItemValidationErrors,
} from "../types/invoiceForm.types";
import {
	type InvoiceFormValues,
	defaultCreateFormValues,
	invoiceToFormValues,
} from "./invoicePayload";

export function getInitialInvoiceFormState(
	mode: "create" | "edit",
	initialInvoice: Invoice | null | undefined,
): InvoiceFormValues {
	if (mode === "edit" && initialInvoice) return invoiceToFormValues(initialInvoice);
	return defaultCreateFormValues();
}

export function validateInvoiceForm(
	nextValues: InvoiceFormValues,
): InvoiceFormErrors {
	const fieldErrors: Record<string, string> = {};
	const itemErrors: ItemValidationErrors[] = [];
	const formErrors: string[] = [];
	const requiredMsg = "can't be empty";

	if (!nextValues.billFrom.streetAddress.trim())
		fieldErrors.billFromStreetAddress = requiredMsg;
	if (!nextValues.billFrom.city.trim()) fieldErrors.billFromCity = requiredMsg;
	if (!nextValues.billFrom.postCode.trim()) fieldErrors.billFromPostCode = requiredMsg;
	if (!nextValues.billFrom.country.trim()) fieldErrors.billFromCountry = requiredMsg;

	if (!nextValues.billTo.clientName.trim()) fieldErrors.billToClientName = requiredMsg;
	if (!nextValues.billTo.clientEmail.trim()) fieldErrors.billToClientEmail = requiredMsg;
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextValues.billTo.clientEmail.trim()))
		fieldErrors.billToClientEmail = "invalid email";
	if (!nextValues.billTo.streetAddress.trim())
		fieldErrors.billToStreetAddress = requiredMsg;
	if (!nextValues.billTo.city.trim()) fieldErrors.billToCity = requiredMsg;
	if (!nextValues.billTo.postCode.trim()) fieldErrors.billToPostCode = requiredMsg;
	if (!nextValues.billTo.country.trim()) fieldErrors.billToCountry = requiredMsg;

	if (!nextValues.invoiceDate.trim()) fieldErrors.invoiceDate = requiredMsg;
	if (!nextValues.projectDescription.trim())
		fieldErrors.projectDescription = requiredMsg;

	nextValues.items.forEach((item, index) => {
		const itemError: ItemValidationErrors = {};
		if (!item.name.trim()) itemError.name = requiredMsg;
		if (!Number.isFinite(item.quantity) || item.quantity <= 0)
			itemError.quantity = "must be > 0";
		if (!Number.isFinite(item.price) || item.price <= 0)
			itemError.price = "must be > 0";
		itemErrors[index] = itemError;
	});

	if (nextValues.items.length === 0) {
		formErrors.push("An item must be added");
	} else if (itemErrors.some((entry) => Object.keys(entry).length > 0)) {
		formErrors.push("An item must be added");
	}

	if (Object.keys(fieldErrors).length > 0 || formErrors.length > 0) {
		formErrors.unshift("All fields must be added");
	}

	return { fields: fieldErrors, items: itemErrors, form: formErrors };
}

export function hasInvoiceFormErrors(errors: InvoiceFormErrors): boolean {
	return (
		Object.keys(errors.fields).length > 0 ||
		errors.form.length > 0 ||
		errors.items.some((entry) => Object.keys(entry).length > 0)
	);
}
