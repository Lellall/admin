interface TextProps {
  children: React.ReactNode
  h1?: boolean
  h2?: boolean
  h3?: boolean
  style?: React.CSSProperties
  block?: boolean
  color?: string
}

const Text = ({ children, color, block, h1, h2, h3, style }: TextProps) => {
  const baseStyle = {
    color: color ? color : "#000",
    fontSize: h1 ? "24px" : h2 ? "18px" : h3 ? "16px" : "14px",
    fontWeight: h1 ? "bold" : h2 ? "800" : h3 ? "600" : "400",
    display: block ? "block" : "inline",
    // fontFamily: h1 || h2 || h3 ? "Poppins" : "Poppins",
  }

  const combinedStyle = { ...baseStyle, ...style }

  return <span style={combinedStyle}>{children}</span>
}

export default Text
