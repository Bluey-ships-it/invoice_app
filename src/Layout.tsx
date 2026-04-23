import type { Location } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import EditInvoice from "./pages/EditInvoice";
import CreateInvoice from "./pages/CreateInvoice";

type LocationState = { background?: Location };

const Layout = () => {
	const location = useLocation();
	const background = (location.state as LocationState | null)?.background;

	return (
		<div className="min-h-screen max-w-360 bg-surface dark:bg-surface-dark transition-colors duration-300 lg:flex ">
			<Header />
			<div className="hidden lg:flex w-25.75"></div>
			<main className="relative w-[85%] md:max-w-2xl lg:max-w-182.5 mx-auto mt-9 md:mt-16 lg:mt-19.5">
				<Routes location={background ?? location}>
					<Route path="/" element={<Invoices />} />
					<Route path="invoices/new" element={<CreateInvoice />} />
					<Route path="invoices/:id" element={<InvoiceDetail />} />
					<Route path="invoices/:id/edit" element={<EditInvoice />} />
				</Routes>
				{background ? (
					<Routes>
						<Route path="invoices/new" element={<CreateInvoice />} />
						<Route path="invoices/:id/edit" element={<EditInvoice />} />
					</Routes>
				) : null}
			</main>
		</div>
	);
};

export default Layout;
