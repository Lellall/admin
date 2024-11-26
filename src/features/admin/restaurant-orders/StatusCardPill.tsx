interface CardProps {
  status: string
}
function StatusCardPill(props: CardProps) {
  return <div> {props.status}</div>
}

export default StatusCardPill
