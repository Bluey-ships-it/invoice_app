import PillButton from "../PillButton";

export default function ActionBtns() {
  return (
    <div className="flex gap-2">
      <PillButton label="Edit"/>
      <PillButton label="Delete" variant="danger"/>
      <PillButton label="Mark as Read" variant="primary"/>
    </div>
  )
}
