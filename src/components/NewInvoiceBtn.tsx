import { useLocation, useNavigate } from "react-router-dom";
import Plus from "./icons/Plus";
import { motion } from "motion/react";

export default function NewInvoiceBtn() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<motion.button
			type="button"
			onClick={() =>
				navigate("/invoices/new", { state: { background: location } })
			}
			className="bg-primary rounded-3xl h-11 w-22.5 md:w-37.5 md:h-12 flex p-1.5 items-center gap-2 md:gap-3 text-white cursor-pointer"
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: 0.15, ease: "easeOut" }}
		>
			<span>
				<Plus />
			</span>
			<span className="font-bold text-sm tracking-[-0.25]">
				New <span className="hidden md:inline">Invoice</span>
			</span>
		</motion.button>
	);
}
