import type { Location } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import type { Invoice } from "../types/invoice.types";
import { useInvoices } from "../context/InvoicesContext";
import FormModalShell from "../components/invoice-form/FormModalShell";
import InvoiceForm from "../components/invoice-form/InvoiceForm";
import GoBack from "../components/GoBack";

type LocationState = { background?: Location };

export default function CreateInvoice() {
	const navigate = useNavigate();
	const location = useLocation();
	const { addInvoice } = useInvoices();
	const background = (location.state as LocationState | null)?.background;
	const isModal = Boolean(background);

	function exit() {
		if (background) navigate(-1);
		else navigate("/");
	}

	function handleSubmit(payload: Invoice) {
		addInvoice(payload);
		exit();
	}

	const form = (
		<InvoiceForm
			mode="create"
			onSubmit={handleSubmit}
			onCancel={exit}
		/>
	);

	if (isModal) {
		return (
			<FormModalShell title="New Invoice" onClose={exit}>
				{form}
			</FormModalShell>
		);
	}

	return (
		<section>
			<div className="mb-8">
				<GoBack />
			</div>
			<h1 className="mb-8 text-2xl font-bold text-text-heading dark:text-white">
				New Invoice
			</h1>
			{form}
		</section>
	);
}
