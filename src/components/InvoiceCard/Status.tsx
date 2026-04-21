import { useTheme } from "../../context/ThemeContext";
import { type InvoiceStatus } from "../../types/invoice.types";
import Dot from "../icons/Dot";

interface Props {
	status: InvoiceStatus;
}

const statusStyles: Record<
	InvoiceStatus,
	{
		bg: string;
		text: string;
		fill: string;
		bgDark?: string;
		textDark?: string;
		fillDark?: string;
	}
> = {
	paid: { bg: "bg-emerald-400/5", text: "text-emerald-400", fill: "#33D69F" },
	pending: { bg: "bg-amber-500/5", text: "text-amber-500", fill: "#FF8F00" },
	draft: {
		bg: "bg-gray-700/5",
		text: "text-gray-700",
		fill: "#373B53",
		bgDark: "dark:bg-indigo-100/5",
		textDark: "dark:text-indigo-100",
		fillDark: "#DFE3FA",
	},
};

export default function Status({ status }: Props) {
	const { bg, text, fill, bgDark, textDark, fillDark } = statusStyles[status];
	const { theme } = useTheme();
	const themeFill = theme === "light" ? fill : fillDark;
	return (
		<div
			className={`w-26  h-10 flex justify-center items-center gap-2 rounded-md font-bold ${bg} ${text} ${bgDark} ${textDark}`}
		>
			<Dot fill={themeFill} />
			<span className="capitalize">{status}</span>
		</div>
	);
}
