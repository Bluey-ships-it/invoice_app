import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import EditInvoice from "./pages/EditInvoice";
import CreateInvoice from "./pages/CreateInvoice";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Invoices />} />
					<Route path="invoices/new" element={<CreateInvoice />} />
					<Route path="invoices/:id" element={<InvoiceDetail />} />
					<Route path="invoices/:id/edit" element={<EditInvoice />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
