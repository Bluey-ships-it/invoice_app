import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InvoicesProvider } from "./context/InvoicesContext";
import Layout from "./Layout";

export default function App() {
	return (
		<BrowserRouter>
			<InvoicesProvider>
				<Routes>
					<Route path="/*" element={<Layout />} />
				</Routes>
			</InvoicesProvider>
		</BrowserRouter>
	);
}
