export default function InvoiceCard() {
	return (
		<div className="bg-surface-card dark:bg-surface-card-dark w-80 h-33.5 rounded-lg shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.10)] p-6 flex flex-col">
			<div className="flex justify-between">
				<span className="font-bold">
					<span>#</span>RT3080
				</span>
				<span>Jensen Huang</span>
			</div>
			<div className="flex justify-between items-center">
				<div className="flex flex-col gap-2.25">
					<span>Due 19 Aug 2021</span>
					<span>$1,800</span>
				</div>
				<div className="w-24 h-10 flex justify-center items-center rounded-md bg-emerald-400/5 text-emerald-400 font-bold">
					<span>Paid</span>
				</div>
			</div>
		</div>
	);
}
