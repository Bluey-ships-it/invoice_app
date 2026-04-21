import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
	return (
		<div className="min-h-screen max-w-360 bg-surface dark:bg-surface-dark transition-colors duration-300 lg:flex ">
			<Header />
            <div className="hidden lg:flex w-25.75"></div>
			<main className="w-[85%] md:max-w-2xl lg:max-w-182.5 mx-auto mt-9 md:mt-16 lg:mt-19.5">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
