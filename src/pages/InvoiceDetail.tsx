import GoBack from "../components/GoBack";
import DetailsContainer from "../components/ViewInvoiceDetail/DetailsContainer";
import ActionBtns from "../components/ViewInvoiceDetail/ActionBtns";
import { motion } from "motion/react";
export default function InvoiceDetail() {
	return (
		<motion.section
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
		>
			<GoBack />
			<DetailsContainer />
			<motion.div
				className="w-dvw -ml-[10%] h-22.5 md:hidden bg-surface-card dark:bg-surface-card-dark flex items-center justify-center"
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
			>
				{" "}
				<ActionBtns />
			</motion.div>
		</motion.section>
	);
}
