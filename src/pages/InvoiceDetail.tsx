import GoBack from "../components/GoBack";
import DetailsContainer from "../components/ViewInvoiceDetail/DetailsContainer";
import ActionBtns from "../components/ViewInvoiceDetail/ActionBtns";
export default function InvoiceDetail() {
	return (
		<section>
			<GoBack />
			<DetailsContainer />
			<div className="w-dvw -ml-[10%] h-22.5 md:hidden bg-surface-card dark:bg-surface-card-dark flex items-center justify-center">
				{" "}
				<ActionBtns />
			</div>
		</section>
	);
}
