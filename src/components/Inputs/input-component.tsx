import { MenuItem, Select, TextField } from "@mui/material"
import { useController } from "react-hook-form"
import styled from "styled-components"
import Switch from "@mui/material/Switch"

interface InputComponentProps {
  control?: any
  type?: "text" | "number" | "password" | "email" | "date" | "checkbox" | "time" | "textArea" | "select"
  name: string
  label?: string
  errorMessage?: string
  styledContainer?: React.CSSProperties
  styledInput?: React.CSSProperties
  disabled?: boolean
  rules?: any
  options?: { value: string | number; label: string }[]
}
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: "100%",
    },
  },
}

function InputComponent({
  control,
  type = "text",
  name,
  label,
  errorMessage,
  styledContainer,
  styledInput,
  disabled = false,
  rules = {},
  options,
}: InputComponentProps) {
  const { field } = useController({
    name,
    control: control ?? {},
    rules,
  })

  let formattedDate = ""
  if (field.value) {
    const dateObject = new Date(field.value)
    if (!Number.isNaN(dateObject.getTime())) {
      formattedDate = dateObject.toISOString().slice(0, 10)
    }
  }
  const style = { width: "100%", ...styledInput }
  return (
    <InputContainer style={styledContainer}>
      <StyledLabel>{label}</StyledLabel>
      {type == "select" && (
        <>
          <Select
            style={style}
            placeholder={"Select "}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            inputRef={field.ref}
            value={field.value || ""}
            error={Boolean(errorMessage)}
            type={type}
            disabled={disabled}
            MenuProps={MenuProps}
          >
            {options?.map((item) => <MenuItem value={item.value}> {item.label} </MenuItem>)}
          </Select>
        </>
      )}
      {type === "text" && (
        <>
          <StyledInput
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            inputRef={field.ref}
            value={field.value || ""}
            error={Boolean(errorMessage)}
            type={type}
            disabled={disabled}
            style={styledInput}
            // helperText={errorMsg}
          />
          {Boolean(errorMessage) && (
            <div
              style={{
                fontSize: "12px",
                color: "red",
                marginTop: "25px",
              }}
            >
              {errorMessage}
            </div>
          )}
        </>
      )}
      {type === "textArea" && (
        <>
          <TextAreaInput
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            value={field.value || ""}
            // error={Boolean(errorMessage)}
            // type={type}
            disabled={disabled}
            style={styledInput}
            // helperText={errorMsg}
          />
          {Boolean(errorMessage) && (
            <div
              style={{
                fontSize: "12px",
                color: "red",
                marginTop: "25px",
              }}
            >
              {errorMessage}
            </div>
          )}
        </>
      )}

      {type === "time" && (
        <>
          <StyledInput
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            inputRef={field.ref}
            value={field.value || ""}
            error={Boolean(errorMessage)}
            type="time"
            disabled={disabled}
            style={styledInput}
          />

          {Boolean(errorMessage) && (
            <div
              style={{
                fontSize: "12px",
                color: "red",
                marginTop: "25px",
              }}
            >
              {errorMessage}
            </div>
          )}
        </>
      )}

      {type === "checkbox" && (
        <>
          <Switch checked={field.value || false} onChange={field.onChange} color="primary" value="dynamic-class-name" />
          {Boolean(errorMessage) && (
            <div
              style={{
                fontSize: "12px",
                color: "red",
                marginTop: "25px",
              }}
            >
              {errorMessage}
            </div>
          )}
        </>
      )}

      {type === "number" && (
        <>
          <StyledInput
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            inputRef={field.ref}
            value={field.value || ""}
            error={Boolean(errorMessage)}
            type="number"
            disabled={disabled}
          />
          {Boolean(errorMessage) && (
            <div
              style={{
                fontSize: "12px",
                color: "red",
                marginTop: "25px",
              }}
            >
              {errorMessage}
            </div>
          )}
        </>
      )}
      {type === "date" && (
        <>
          <StyledInput
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            inputRef={field.ref}
            value={formattedDate || ""}
            error={Boolean(errorMessage)}
            type="date"
            disabled={disabled}
            // label={label}
            // helperText={hasError && errors[name].message} // Display error message
          />
          {Boolean(errorMessage) && (
            <div
              style={{
                fontSize: "12px",
                color: "red",
                marginTop: "25px",
              }}
            >
              {errorMessage}
            </div>
          )}
        </>
      )}
    </InputContainer>
  )
}

export default InputComponent

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
  width: 100%;
  @media screen and (max-width: 765px) {
    margin: 15px;
  }
`

const StyledInput = styled(TextField)`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid "#D3D3D3";
  border-radius: 3px;
  height: 35px;
  font-size: 14px;
  outline: none;
  color: #808080;
  &::placeholder {
    font-weight: 300;
    font-size: 10px;
  }
  &:active {
    outline: none;
  }
`

const TextAreaInput = styled.textarea`
  height: 120px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #d3d3d3;
  border-radius: 3px;
  font-size: 14px;
  outline: none;
  font-weight: 400;
`

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #808080;
  font-size: 13px;
`
