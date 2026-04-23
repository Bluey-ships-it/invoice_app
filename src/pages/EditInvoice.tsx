import type { Location } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Invoice } from "../types/invoice.types";
import { useInvoices } from "../context/InvoicesContext";
import FormModalShell from "../components/invoice-form/FormModalShell";
import InvoiceForm from "../components/invoice-form/InvoiceForm";
import GoBack from "../components/GoBack";

type LocationState = { background?: Location };

export default function EditInvoice() {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const { getInvoice, updateInvoice } = useInvoices();
	const background = (location.state as LocationState | null)?.background;
	const isModal = Boolean(background);

	const invoice = id ? getInvoice(id) ?? null : null;

	function exit() {
		if (background) navigate(-1);
		else if (id) navigate(`/invoices/${id}`);
		else navigate("/");
	}

	function handleSubmit(payload: Invoice) {
		updateInvoice(payload);
		exit();
	}

	if (!invoice) {
		return (
			<section>
				<div className="mb-8">
					<GoBack />
				</div>
				<p className="text-sm text-muted-blue dark:text-muted">Invoice not found.</p>
			</section>
		);
	}

	const form = (
		<InvoiceForm
			mode="edit"
			initialInvoice={invoice}
			onSubmit={handleSubmit}
			onCancel={exit}
		/>
	);

	if (isModal) {
		return (
			<FormModalShell title={`Edit #${invoice.id}`} onClose={exit}>
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
				Edit #{invoice.id}
			</h1>
			{form}
		</section>
	);
}
