import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type { InvoiceStatus } from "../../types/invoice.types";
import type { InvoiceFormErrors, InvoiceFormProps } from "../../types/invoiceForm.types";
import {
	type InvoiceFormValues,
	formValuesToInvoicePayload,
} from "../../utils/invoicePayload";
import {
	getInitialInvoiceFormState,
	hasInvoiceFormErrors,
	validateInvoiceForm,
} from "../../utils/invoiceFormValidation";
import BillFromSection from "./BillFromSection";
import BillToSection from "./BillToSection";
import InvoiceDetailsSection from "./InvoiceDetailsSection";
import ItemListSection from "./ItemListSection";
import InvoiceFormActions from "./InvoiceFormActions";

export default function InvoiceForm({
	mode,
	initialInvoice,
	onSubmit,
	onCancel,
}: InvoiceFormProps) {
	const [values, setValues] = useState<InvoiceFormValues>(() =>
		getInitialInvoiceFormState(mode, initialInvoice),
	);
	const [errors, setErrors] = useState<InvoiceFormErrors>({
		fields: {},
		items: [],
		form: [],
	});

	useEffect(() => {
		if (mode === "edit" && initialInvoice) {
			setValues(getInitialInvoiceFormState(mode, initialInvoice));
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

	function clearItemError(index: number, key: "name" | "quantity" | "price") {
		setErrors((prev) => {
			if (!prev.items[index]?.[key]) return prev;
			const nextItems = [...prev.items];
			nextItems[index] = { ...nextItems[index], [key]: undefined };
			return { ...prev, items: nextItems };
		});
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
			const validation = validateInvoiceForm(values);
			if (hasInvoiceFormErrors(validation)) {
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
		<form onSubmit={handleSubmit} className="flex h-full min-h-0 flex-col ">
			<div className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
				<div className="flex flex-col gap-10">
					<BillFromSection
						values={values.billFrom}
						errors={errors.fields}
						onChange={updateBillFrom}
					/>
					<BillToSection
						values={values.billTo}
						errors={errors.fields}
						onChange={updateBillTo}
					/>
					<InvoiceDetailsSection
						values={{
							invoiceDate: values.invoiceDate,
							paymentTerms: values.paymentTerms,
							projectDescription: values.projectDescription,
						}}
						errors={errors.fields}
						onInvoiceDateChange={(invoiceDate) => {
							setValues((v) => ({ ...v, invoiceDate }));
							clearFieldError("invoiceDate");
						}}
						onPaymentTermsChange={(paymentTerms) =>
							setValues((v) => ({ ...v, paymentTerms }))
						}
						onProjectDescriptionChange={(projectDescription) => {
							setValues((v) => ({ ...v, projectDescription }));
							clearFieldError("projectDescription");
						}}
					/>
					<ItemListSection
						items={values.items}
						itemErrors={errors.items}
						formErrors={errors.form}
						onItemChange={updateItem}
						onRemoveItem={removeItem}
						onAddItem={addItem}
					/>
				</div>
			</div>
			<InvoiceFormActions
				mode={mode}
				onCancel={onCancel}
				onSaveDraft={handleSaveDraft}
			/>
		</form>
	);
}
