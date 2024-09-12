import { useNavigate } from "react-router-dom"
import { IoArrowBackOutline } from "react-icons/io5"

type TitledBackButtonProps = {
  title?: string
  onBack?: () => void
  icon?: string
}

export function TitledBackButton(props: TitledBackButtonProps) {
  const navigate = useNavigate()
  const { title, onBack = () => navigate(-1), icon } = props

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <button
        onClick={() => onBack()}
        style={{
          cursor: "pointer",
          background: "#fff",
          width: "40px",
          height: "40px",
          borderRadius: "50px",
          // border: "1px solid grey",
        }}
      >
        <div>{icon || <IoArrowBackOutline />}</div>
      </button>

      <p>{title}</p>
    </div>
  )
}
