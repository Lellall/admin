import { BackSquare } from "iconsax-react"
import { useNavigate } from "react-router-dom"
// import { IoArrowBackOutline } from "react-icons/io5"

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
      onClick={onBack}
      className="mt-10 mb-10 ml-1 cursor-pointer"
    >
      <div className="flex"><BackSquare size="22" color="#15803db8" /><p className="ml-3" style={{ color: '#15803db8' }}>Back</p> </div>
      <p>{title}</p>
    </div>
  )
}
