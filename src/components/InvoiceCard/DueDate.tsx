export default function DueDate({ date }:{date: string}) {
	return (
		<span className="text-muted-blue dark:text-muted text-xs md:text-[13px] md:w-25 flex gap-1 items-center">
			{" "}
			<span className="light:text-text-body ">Due</span>
			<span>{date}</span>
		</span>
	);
}
