import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import type { Invoice } from "../types/invoice.types";
import seedInvoices from "../constants/data";
import { ensureInvoicesSeeded, saveInvoices } from "../lib/invoicesStorage";

type InvoicesContextValue = {
	invoices: Invoice[];
	getInvoice: (id: string) => Invoice | undefined;
	addInvoice: (invoice: Invoice) => void;
	updateInvoice: (invoice: Invoice) => void;
	deleteInvoice: (id: string) => void;
	markAsPaid: (id: string) => void;
};

const InvoicesContext = createContext<InvoicesContextValue | null>(null);

export function InvoicesProvider({ children }: { children: ReactNode }) {
	const [invoices, setInvoices] = useState<Invoice[]>(() =>
		ensureInvoicesSeeded(seedInvoices),
	);

	const persist = useCallback((next: Invoice[]) => {
		saveInvoices(next);
		setInvoices(next);
	}, []);

	const getInvoice = useCallback(
		(id: string) => invoices.find((inv) => inv.id === id),
		[invoices],
	);

	const addInvoice = useCallback(
		(invoice: Invoice) => {
			persist([...invoices, invoice]);
		},
		[invoices, persist],
	);

	const updateInvoice = useCallback(
		(invoice: Invoice) => {
			persist(
				invoices.map((inv) => (inv.id === invoice.id ? invoice : inv)),
			);
		},
		[invoices, persist],
	);

	const deleteInvoice = useCallback(
		(id: string) => {
			persist(invoices.filter((inv) => inv.id !== id));
		},
		[invoices, persist],
	);

	const markAsPaid = useCallback(
		(id: string) => {
			persist(
				invoices.map((inv) =>
					inv.id === id ? { ...inv, status: "paid" as const } : inv,
				),
			);
		},
		[invoices, persist],
	);

	const value = useMemo(
		() => ({
			invoices,
			getInvoice,
			addInvoice,
			updateInvoice,
			deleteInvoice,
			markAsPaid,
		}),
		[
			invoices,
			getInvoice,
			addInvoice,
			updateInvoice,
			deleteInvoice,
			markAsPaid,
		],
	);

	return (
		<InvoicesContext.Provider value={value}>
			{children}
		</InvoicesContext.Provider>
	);
}

export function useInvoices() {
	const ctx = useContext(InvoicesContext);
	if (!ctx) {
		throw new Error("useInvoices must be used within InvoicesProvider");
	}
	return ctx;
}
