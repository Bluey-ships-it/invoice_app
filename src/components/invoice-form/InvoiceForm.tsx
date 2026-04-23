import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type { Invoice, InvoiceStatus } from "../../types/invoice.types";
import FormSection from "../form/FormSection";
import ResponsiveFieldRow from "../form/ResponsiveFieldRow";
import SelectField from "../form/SelectField";
import TextField from "../form/TextField";
import {
	type InvoiceFormValues,
	PAYMENT_TERMS_OPTIONS,
	defaultCreateFormValues,
	formValuesToInvoicePayload,
	invoiceToFormValues,
} from "../../utils/invoicePayload";
import ItemRow from "./ItemRow";

type InvoiceFormProps = {
	mode: "create" | "edit";
	initialInvoice?: Invoice | null;
	onSubmit: (payload: Invoice) => void;
	onCancel: () => void;
};

type ItemValidationErrors = {
	name?: string;
	quantity?: string;
	price?: string;
};

type InvoiceFormErrors = {
	fields: Record<string, string>;
	items: ItemValidationErrors[];
	form: string[];
};

function getInitialState(
	mode: "create" | "edit",
	initialInvoice: Invoice | null | undefined,
): InvoiceFormValues {
	if (mode === "edit" && initialInvoice) return invoiceToFormValues(initialInvoice);
	return defaultCreateFormValues();
}

export default function InvoiceForm({
	mode,
	initialInvoice,
	onSubmit,
	onCancel,
}: InvoiceFormProps) {
	const [values, setValues] = useState<InvoiceFormValues>(() =>
		getInitialState(mode, initialInvoice),
	);
	const [errors, setErrors] = useState<InvoiceFormErrors>({
		fields: {},
		items: [],
		form: [],
	});

	useEffect(() => {
		if (mode === "edit" && initialInvoice) {
			setValues(invoiceToFormValues(initialInvoice));
		}
	}, [mode, initialInvoice]);

	function clearFieldError(field: string) {
		setErrors((prev) => {
			if (!prev.fields[field]) return prev;
			const nextFields = { ...prev.fields };
			delete nextFields[field];
			return { ...prev, fields: nextFields };
		});
	}

	function clearItemError(index: number, key: keyof ItemValidationErrors) {
		setErrors((prev) => {
			if (!prev.items[index]?.[key]) return prev;
			const nextItems = [...prev.items];
			nextItems[index] = { ...nextItems[index], [key]: undefined };
			return { ...prev, items: nextItems };
		});
	}

	function validateForm(nextValues: InvoiceFormValues): InvoiceFormErrors {
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

	function updateBillFrom(patch: Partial<InvoiceFormValues["billFrom"]>) {
		setValues((v) => ({ ...v, billFrom: { ...v.billFrom, ...patch } }));
		const keys = Object.keys(patch);
		if (keys.includes("streetAddress")) clearFieldError("billFromStreetAddress");
		if (keys.includes("city")) clearFieldError("billFromCity");
		if (keys.includes("postCode")) clearFieldError("billFromPostCode");
		if (keys.includes("country")) clearFieldError("billFromCountry");
	}

	function updateBillTo(patch: Partial<InvoiceFormValues["billTo"]>) {
		setValues((v) => ({ ...v, billTo: { ...v.billTo, ...patch } }));
		const keys = Object.keys(patch);
		if (keys.includes("clientName")) clearFieldError("billToClientName");
		if (keys.includes("clientEmail")) clearFieldError("billToClientEmail");
		if (keys.includes("streetAddress")) clearFieldError("billToStreetAddress");
		if (keys.includes("city")) clearFieldError("billToCity");
		if (keys.includes("postCode")) clearFieldError("billToPostCode");
		if (keys.includes("country")) clearFieldError("billToCountry");
	}

	function updateItem(index: number, patch: Partial<InvoiceFormValues["items"][0]>) {
		setValues((v) => ({
			...v,
			items: v.items.map((row, i) => (i === index ? { ...row, ...patch } : row)),
		}));
		const keys = Object.keys(patch);
		if (keys.includes("name")) clearItemError(index, "name");
		if (keys.includes("quantity")) clearItemError(index, "quantity");
		if (keys.includes("price")) clearItemError(index, "price");
	}

	function addItem() {
		setValues((v) => ({
			...v,
			items: [...v.items, { name: "", quantity: 1, price: 0 }],
		}));
		setErrors((prev) => ({ ...prev, form: prev.form.filter((e) => e !== "An item must be added") }));
	}

	function removeItem(index: number) {
		setValues((v) => ({
			...v,
			items: v.items.length > 1 ? v.items.filter((_, i) => i !== index) : v.items,
		}));
		setErrors((prev) => ({
			...prev,
			items: prev.items.filter((_, i) => i !== index),
		}));
	}

	function submitWithStatus(
		status: InvoiceStatus,
		options: { validate: boolean },
	) {
		if (options.validate) {
			const validation = validateForm(values);
			if (
				Object.keys(validation.fields).length > 0 ||
				validation.form.length > 0 ||
				validation.items.some((entry) => Object.keys(entry).length > 0)
			) {
				setErrors(validation);
				return;
			}
		}
		const payload = formValuesToInvoicePayload(values);
		onSubmit({ ...payload, status });
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (mode === "create") {
			submitWithStatus("pending", { validate: true });
			return;
		}
		submitWithStatus(values.status, { validate: true });
	}

	function handleSaveDraft() {
		submitWithStatus("draft", { validate: false });
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-10">
			<FormSection title="Bill From">
				<TextField
					id="billFrom-street"
					label="Street Address"
					value={values.billFrom.streetAddress}
					onChange={(streetAddress) => updateBillFrom({ streetAddress })}
					error={errors.fields.billFromStreetAddress}
					placeholder="e.g. 19 Union Terrace"
				/>
				<ResponsiveFieldRow className="sm:grid-cols-3">
					<TextField
						id="billFrom-city"
						label="City"
						value={values.billFrom.city}
						onChange={(city) => updateBillFrom({ city })}
						error={errors.fields.billFromCity}
						placeholder="e.g. London"
					/>
					<TextField
						id="billFrom-post"
						label="Post Code"
						value={values.billFrom.postCode}
						onChange={(postCode) => updateBillFrom({ postCode })}
						error={errors.fields.billFromPostCode}
						placeholder="e.g. E1 3EZ"
					/>
					<TextField
						id="billFrom-country"
						label="Country"
						value={values.billFrom.country}
						onChange={(country) => updateBillFrom({ country })}
						error={errors.fields.billFromCountry}
						placeholder="e.g. United Kingdom"
					/>
				</ResponsiveFieldRow>
			</FormSection>

			<FormSection title="Bill To">
				<TextField
					id="billTo-name"
					label="Client's Name"
					value={values.billTo.clientName}
					onChange={(clientName) => updateBillTo({ clientName })}
					error={errors.fields.billToClientName}
					placeholder="e.g. Alex Grim"
				/>
				<TextField
					id="billTo-email"
					label="Client's Email"
					type="email"
					value={values.billTo.clientEmail}
					onChange={(clientEmail) => updateBillTo({ clientEmail })}
					placeholder="name@email.com"
					error={errors.fields.billToClientEmail}
				/>
				<TextField
					id="billTo-street"
					label="Street Address"
					value={values.billTo.streetAddress}
					onChange={(streetAddress) => updateBillTo({ streetAddress })}
					error={errors.fields.billToStreetAddress}
					placeholder="e.g. 84 Church Way"
				/>
				<ResponsiveFieldRow className="sm:grid-cols-3">
					<TextField
						id="billTo-city"
						label="City"
						value={values.billTo.city}
						onChange={(city) => updateBillTo({ city })}
						error={errors.fields.billToCity}
						placeholder="e.g. Bradford"
					/>
					<TextField
						id="billTo-post"
						label="Post Code"
						value={values.billTo.postCode}
						onChange={(postCode) => updateBillTo({ postCode })}
						error={errors.fields.billToPostCode}
						placeholder="e.g. BD1 9PB"
					/>
					<TextField
						id="billTo-country"
						label="Country"
						value={values.billTo.country}
						onChange={(country) => updateBillTo({ country })}
						error={errors.fields.billToCountry}
						placeholder="e.g. United Kingdom"
					/>
				</ResponsiveFieldRow>
			</FormSection>

			<FormSection title="Invoice Details">
				<ResponsiveFieldRow>
					<TextField
						id="invoice-date"
						label="Invoice Date"
						type="date"
						value={values.invoiceDate}
						onChange={(invoiceDate) => {
							setValues((v) => ({ ...v, invoiceDate }));
							clearFieldError("invoiceDate");
						}}
						error={errors.fields.invoiceDate}
					/>
					<SelectField
						id="payment-terms"
						label="Payment Terms"
						value={values.paymentTerms}
						onChange={(paymentTerms) =>
							setValues((v) => ({ ...v, paymentTerms }))
						}
						options={PAYMENT_TERMS_OPTIONS}
					error={errors.fields.paymentTerms}
					/>
				</ResponsiveFieldRow>
				<TextField
					id="project-desc"
					label="Project Description"
					value={values.projectDescription}
					onChange={(projectDescription) => {
						setValues((v) => ({ ...v, projectDescription }));
						clearFieldError("projectDescription");
					}}
					error={errors.fields.projectDescription}
					placeholder="e.g. Graphic Design"
				/>
			</FormSection>

			<FormSection title="Item List">
				<div className="flex flex-col gap-6">
					{values.items.map((row, index) => (
						<ItemRow
							key={`row-${index}`}
							row={row}
							index={index}
							onChange={(patch) => updateItem(index, patch)}
							onRemove={() => removeItem(index)}
							canRemove={values.items.length > 1}
							nameError={errors.items[index]?.name}
							quantityError={errors.items[index]?.quantity}
							priceError={errors.items[index]?.price}
						/>
					))}
				</div>
				<button
					type="button"
					onClick={addItem}
					className="mt-2 w-full rounded-full py-4 text-sm font-bold text-muted-blue transition-opacity hover:opacity-80 dark:text-muted"
				>
					+ Add New Item
				</button>
				{errors.form.length > 0 ? (
					<div className="mt-3 space-y-1 text-[10px] font-medium text-danger">
						{errors.form.map((message) => (
							<p key={message}>- {message}</p>
						))}
					</div>
				) : null}
			</FormSection>

			{mode === "create" ? (
				<div className="flex flex-wrap items-center justify-end gap-2 border-t border-black/5 pt-8 dark:border-white/10">
					<button
						type="button"
						onClick={onCancel}
						className="h-12 rounded-full px-6 text-sm font-bold text-muted-blue transition-opacity hover:opacity-80 dark:text-muted"
					>
						Discard
					</button>
					<button
						type="button"
						onClick={handleSaveDraft}
						className="h-12 rounded-full bg-navy px-6 text-sm font-bold text-white transition-opacity hover:opacity-90"
					>
						Save as Draft
					</button>
					<button
						type="submit"
						className="h-12 rounded-full bg-primary px-6 text-sm font-bold text-white transition-opacity hover:opacity-90"
					>
						Save & Send
					</button>
				</div>
			) : (
				<div className="flex flex-col-reverse gap-4 border-t border-black/5 pt-8 dark:border-white/10 sm:flex-row sm:justify-end">
					<button
						type="button"
						onClick={onCancel}
						className="h-12 rounded-full px-7 text-sm font-bold text-muted-blue transition-opacity hover:opacity-80 dark:text-muted"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="h-12 rounded-full bg-primary px-8 text-sm font-bold text-white transition-opacity hover:opacity-90"
					>
						Save Changes
					</button>
				</div>
			)}
		</form>
	);
}
