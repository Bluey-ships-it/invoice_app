import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useInvoices } from "../../context/InvoicesContext";
import ConfirmDialog from "../ConfirmDialog";
import PillButton from "../PillButton";

export default function ActionBtns() {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const { getInvoice, deleteInvoice, markAsPaid } = useInvoices();
	const [deleteOpen, setDeleteOpen] = useState(false);

	const invoice = useMemo(
		() => (id ? getInvoice(id) : undefined),
		[id, getInvoice],
	);

	const canMarkPaid = invoice && invoice.status !== "paid";

	function handleDeleteConfirm() {
		if (!id) return;
		deleteInvoice(id);
		setDeleteOpen(false);
		navigate("/");
	}

	return (
		<>
			<div className="flex flex-wrap gap-2">
				<PillButton
					label="Edit"
					disabled={!id}
					onClick={() => {
						if (!id) return;
						navigate(`/invoices/${id}/edit`, {
							state: { background: location },
						});
					}}
				/>
				<PillButton
					label="Delete"
					variant="danger"
					disabled={!id}
					onClick={() => setDeleteOpen(true)}
				/>
				{canMarkPaid ? (
					<PillButton
						label="Mark as Paid"
						variant="primary"
						onClick={() => id && markAsPaid(id)}
					/>
				) : null}
			</div>

			<ConfirmDialog
				open={deleteOpen}
				title="Confirm Deletion"
				cancelLabel="Cancel"
				confirmLabel="Delete"
				confirmVariant="danger"
				onCancel={() => setDeleteOpen(false)}
				onConfirm={handleDeleteConfirm}
			>
				<p>
					Are you sure you want to delete invoice #{id ?? ""}? This action
					cannot be undone.
				</p>
			</ConfirmDialog>
		</>
	);
}
