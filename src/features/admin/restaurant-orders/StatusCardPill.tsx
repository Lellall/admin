interface CardProps {
  status: string
}
function StatusCardPill(props: CardProps) {
  return <div>S: {props.status}</div>
}

export default StatusCardPill
