import React from "react"
import bg from "../../../assets/rose-petals.svg"
import mainBg from "../../../assets/pattern-randomized.svg"

type CardProps = {
  children: React.ReactNode
  className?: string
  bgColor?: string
  height?: string
  width?: string
  noBg?: boolean
}

function ReusableCard({
  children,
  className = "",
  bgColor = "#0E5D37",
  height = "300px",
  width = "350px",
  noBg = false,
}: CardProps) {
  return (
    <div
      className={`p-4 rounded-lg ${className}`}
      style={{
        backgroundImage: noBg ? `url(https://lellall-dev.sfo3.cdn.digitaloceanspaces.com/pattern-randomized.svg)` : `url(https://lellall-dev.sfo3.cdn.digitaloceanspaces.com/rose-petals.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: bgColor,
        height,
        width,
      }}
    >
      {children}
    </div>
  )
}

ReusableCard.defaultProps = {
  className: "",
  bgColor: "#0E5D37",
  height: "300px",
  width: "350px",
  noBg: false,
}

export default ReusableCard
