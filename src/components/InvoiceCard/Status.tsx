import Dot from "../icons/Dot";
export default function Status() {
	return (
		<div className="w-24 h-10 flex justify-center items-center gap-2 rounded-md bg-emerald-400/5 text-emerald-400 font-bold">
			<Dot />
			<span>Paid</span>
		</div>
	);
}
