import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
	return (
		<div className="min-h-screen bg-surface dark:bg-surface-dark transition-colors duration-300">
			<Header />
			<main className="lg:pl-20">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
