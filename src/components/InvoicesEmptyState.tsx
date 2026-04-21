export default function InvoicesEmptyState() {
	return (
		<div className="text-center flex flex-col items-center gap-10.5 md:gap-16.5">
			<img
				src="/images/shared/empty_state.svg"
				alt="girl in envelope holding a megaphone"
				className="w-48.5 md:w-60"
			/>
			<div className="flex flex-col gap-6">
				<h1 className="font-bold text-2xl dark:text-white">
					There is nothing to see here
				</h1>
				<p className="text-xs md:text-[13px] mx-auto w-44 md:w-52 text-text-body dark:text-muted">
					Create an invoice by clicking the{" "}
					<span className="font-bold">
						New <span className="hidden md:inline">Invoice</span>
					</span>{" "}
					button and get started
				</p>
			</div>
		</div>
	);
}
