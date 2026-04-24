# Invoice Management App

A responsive Invoice Management Application built with React and localStorage for persistence.

---

## Setup

```bash
git clone https://github.com/Bluey-ships-it/invoice_app
cd invoice_app
npm install
npm run dev
```

---

## Architecture

**Stack:** React, React Router v6, CSS Variables, Vite, localStorage

**Structure:**
- `InvoiceContext` — global state via `useReducer`, synced to localStorage
- `InvoiceList` — list view with status filter
- `InvoiceDetail` — full invoice view with mark-as-paid and delete
- `InvoiceForm` — shared create/edit form with validation
- `StatusBadge` — colored pill reflecting draft / pending / paid
- `ThemeContext` — light/dark toggle, persisted to localStorage

---

## Trade-offs

- **localStorage over a backend** — sufficient for the scope; no multi-device sync
- **Context over redux** — state complexity doesn't justify the overhead

---

## Accessibility

- Semantic HTML throughout (`<form>`, `<label>`, `<button>`)
- All inputs have associated `<label>` elements
- Delete modal traps focus, closes on `Escape`, uses `role="dialog"`
- Keyboard navigable
---

## Beyond Requirements

- Animated page and modal transitions
- Empty state illustration when no invoices match the active filter
