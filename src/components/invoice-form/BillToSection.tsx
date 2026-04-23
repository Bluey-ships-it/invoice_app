import FormSection from "../form/FormSection";
import ResponsiveFieldRow from "../form/ResponsiveFieldRow";
import TextField from "../form/TextField";
import type { InvoiceFormValues } from "../../utils/invoicePayload";

type BillToSectionProps = {
	values: InvoiceFormValues["billTo"];
	errors: Record<string, string>;
	onChange: (patch: Partial<InvoiceFormValues["billTo"]>) => void;
};

export default function BillToSection({
	values,
	errors,
	onChange,
}: BillToSectionProps) {
	return (
		<FormSection title="Bill To">
			<TextField
				id="billTo-name"
				label="Client's Name"
				value={values.clientName}
				onChange={(clientName) => onChange({ clientName })}
				error={errors.billToClientName}
				placeholder="e.g. Alex Grim"
			/>
			<TextField
				id="billTo-email"
				label="Client's Email"
				type="email"
				value={values.clientEmail}
				onChange={(clientEmail) => onChange({ clientEmail })}
				placeholder="name@email.com"
				error={errors.billToClientEmail}
			/>
			<TextField
				id="billTo-street"
				label="Street Address"
				value={values.streetAddress}
				onChange={(streetAddress) => onChange({ streetAddress })}
				error={errors.billToStreetAddress}
				placeholder="e.g. 84 Church Way"
			/>
			<ResponsiveFieldRow className="sm:grid-cols-3">
				<TextField
					id="billTo-city"
					label="City"
					value={values.city}
					onChange={(city) => onChange({ city })}
					error={errors.billToCity}
					placeholder="e.g. Bradford"
				/>
				<TextField
					id="billTo-post"
					label="Post Code"
					value={values.postCode}
					onChange={(postCode) => onChange({ postCode })}
					error={errors.billToPostCode}
					placeholder="e.g. BD1 9PB"
				/>
				<TextField
					id="billTo-country"
					label="Country"
					value={values.country}
					onChange={(country) => onChange({ country })}
					error={errors.billToCountry}
					placeholder="e.g. United Kingdom"
				/>
			</ResponsiveFieldRow>
		</FormSection>
	);
}
