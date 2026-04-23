type GrandTotalProps = {
	total: number;
	label?: string;
};

export default function GrandTotal({
	total,
	label = "Amount Due",
}: GrandTotalProps) {
	const formatted = total.toLocaleString("en-GB", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return (
		<div className="bg-[#373B53] dark:bg-text-heading text-white h-20 rounded-b-lg flex items-center p-6 md:p-8 mt-6 justify-between">
			<span>{label}</span>
			<span className="font-bold">£ {formatted}</span>
		</div>
	);
}
