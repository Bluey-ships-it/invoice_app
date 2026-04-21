export default function InvoiceId({ id }: { id: string }) {
	return (
		<span className="font-bold md:w-15 text-sm">
			<span className="text-muted-blue">#</span>
			{id}
		</span>
	);
}
