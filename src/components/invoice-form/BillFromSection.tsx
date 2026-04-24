import FormSection from "../form/FormSection";
import TextField from "../form/TextField";
import type { InvoiceFormValues } from "../../utils/invoicePayload";

type BillFromSectionProps = {
	values: InvoiceFormValues["billFrom"];
	errors: Record<string, string>;
	onChange: (patch: Partial<InvoiceFormValues["billFrom"]>) => void;
};

export default function BillFromSection({
	values,
	errors,
	onChange,
}: BillFromSectionProps) {
	return (
		<FormSection title="Bill From">
			<TextField
				id="billFrom-street"
				label="Street Address"
				value={values.streetAddress}
				onChange={(streetAddress) => onChange({ streetAddress })}
				error={errors.billFromStreetAddress}
				placeholder="e.g. 19 Union Terrace"
			/>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
				<TextField
					id="billFrom-city"
					label="City"
					value={values.city}
					onChange={(city) => onChange({ city })}
					error={errors.billFromCity}
					placeholder="e.g. London"
				/>
				<TextField
					id="billFrom-post"
					label="Post Code"
					value={values.postCode}
					onChange={(postCode) => onChange({ postCode })}
					error={errors.billFromPostCode}
					placeholder="e.g. E1 3EZ"
				/>
				<TextField
					id="billFrom-country"
					label="Country"
					value={values.country}
					onChange={(country) => onChange({ country })}
					error={errors.billFromCountry}
					placeholder="e.g. United Kingdom"
					className="col-span-2 sm:col-span-1"
				/>
			</div>
		</FormSection>
	);
}
