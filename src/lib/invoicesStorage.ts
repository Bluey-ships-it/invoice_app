import type { Invoice } from "../types/invoice.types";

export const INVOICES_STORAGE_KEY = "invoice-app:invoices";

export function loadInvoices(): Invoice[] | null {
	try {
		const raw = localStorage.getItem(INVOICES_STORAGE_KEY);
		if (raw === null) return null;
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed) || parsed.length === 0) return null;
		return parsed as Invoice[];
	} catch {
		return null;
	}
}

export function saveInvoices(invoices: Invoice[]): void {
	localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(invoices));
}

/** If storage is empty or invalid, persist a copy of `seed` and return it. */
export function ensureInvoicesSeeded(seed: readonly Invoice[]): Invoice[] {
	const existing = loadInvoices();
	if (existing !== null) return existing;
	const copy = structuredClone(seed) as Invoice[];
	saveInvoices(copy);
	return copy;
}
