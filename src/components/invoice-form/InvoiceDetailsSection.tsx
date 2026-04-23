import FormSection from "../form/FormSection";
import ResponsiveFieldRow from "../form/ResponsiveFieldRow";
import SelectField from "../form/SelectField";
import TextField from "../form/TextField";
import type { InvoiceFormValues } from "../../utils/invoicePayload";
import { PAYMENT_TERMS_OPTIONS } from "../../utils/invoicePayload";

type InvoiceDetailsSectionProps = {
	values: Pick<
		InvoiceFormValues,
		"invoiceDate" | "paymentTerms" | "projectDescription"
	>;
	errors: Record<string, string>;
	onInvoiceDateChange: (invoiceDate: string) => void;
	onPaymentTermsChange: (paymentTerms: InvoiceFormValues["paymentTerms"]) => void;
	onProjectDescriptionChange: (projectDescription: string) => void;
};

export default function InvoiceDetailsSection({
	values,
	errors,
	onInvoiceDateChange,
	onPaymentTermsChange,
	onProjectDescriptionChange,
}: InvoiceDetailsSectionProps) {
	return (
		<FormSection title="Invoice Details">
			<ResponsiveFieldRow>
				<TextField
					id="invoice-date"
					label="Invoice Date"
					type="date"
					value={values.invoiceDate}
					onChange={onInvoiceDateChange}
					error={errors.invoiceDate}
				/>
				<SelectField
					id="payment-terms"
					label="Payment Terms"
					value={values.paymentTerms}
					onChange={onPaymentTermsChange}
					options={PAYMENT_TERMS_OPTIONS}
					error={errors.paymentTerms}
				/>
			</ResponsiveFieldRow>
			<TextField
				id="project-desc"
				label="Project Description"
				value={values.projectDescription}
				onChange={onProjectDescriptionChange}
				error={errors.projectDescription}
				placeholder="e.g. Graphic Design"
			/>
		</FormSection>
	);
}
