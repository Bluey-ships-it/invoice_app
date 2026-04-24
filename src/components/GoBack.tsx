import { useNavigate } from "react-router-dom";
import AnlgeLeft from "./icons/AnlgeLeft";

export default function GoBack() {
	const navigate = useNavigate();
	return (
		<button
			type="button"
			onClick={() => navigate(-1)}
			className="flex cursor-pointer gap-6 items-center"
		>
			<AnlgeLeft /> <span className="font-bold text-[15px]">Go back</span>
		</button>
	);
}
