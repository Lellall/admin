import { useState } from "react"
import styled from "styled-components"
import { Eye, EyeSlash } from "iconsax-react"

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`

interface InputProps {
  hasToggle?: boolean
  hasError?: boolean
}
const StyledInput = styled.input<InputProps>`
  padding: 10px 20px;
  padding-right: ${(props) => (props.hasToggle ? "40px" : "20px")};
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${(props) => (props.hasError ? "red" : "#D3D3D3")};
  border-radius: 3px;
  height: 45px;
  font-size: 14px;
  outline: none;
  color: #808080;
  &::placeholder {
    // color: #ccc;
    font-weight: 300;
    font-size: 10px;
  }
`

interface ButtonProps {
  hasError?: boolean
}
const EyeIcon = styled.button<ButtonProps>`
  position: absolute;
  top: ${(props) => (props.hasError ? "55%" : "80%")};
  right: 4px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #808080;
  font-size: 13px;
`

const IconContainer = styled.div<ButtonProps>`
  position: absolute;
  top: ${(props) => (props.hasError ? "55%" : "70%")};
  right: 10px;
  transform: translateY(-50%);
  color: #ccc;
`

interface InputWithIconProps {
  icon?: any
  label?: string
  name?: string
  type: string
  hasError?: boolean
  errorMessage?: string
}

function InputWithIcon({
  icon: Icon,
  label,
  // eslint-disable-next-line no-unused-vars
  name,
  type,
  hasError,
  errorMessage,
  ...inputProps
}: InputWithIconProps) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const hasToggle = type === "password"

  return (
    <InputContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        {...inputProps}
        type={showPassword ? "text" : type}
        hasError={hasError}
        hasToggle={hasToggle}
        name={name}
      />
      {type !== "password" && (
        <IconContainer hasError={hasError}>
          <Icon size="16" />
        </IconContainer>
      )}
      {hasToggle && (
        <EyeIcon hasError onClick={togglePasswordVisibility}>
          {showPassword ? (
            <div
              style={{
                marginTop: `${hasError ? "0px" : "20px"} `,
                color: "#ccc",
              }}
            >
              <EyeSlash size="16" />
            </div>
          ) : (
            <div
              style={{
                marginTop: `${hasError ? "0px" : "20px"} `,
                color: "#ccc",
              }}
            >
              <Eye size="16" />
            </div>
          )}
        </EyeIcon>
      )}
      {hasError && <div style={{ fontSize: "12px", color: "red", marginTop: "5px" }}>{errorMessage}</div>}
    </InputContainer>
  )
}

export default InputWithIcon
