import { TextField } from '@mui/material';
import { useController } from 'react-hook-form';
import styled from 'styled-components';
import Switch from '@mui/material/Switch';
interface InputComponentProps {
  control: any;
  type?: 'text' | 'number' | 'password' | 'email' | 'date' | 'checkbox';
  name: string;
  label?: string;
  errorMessage?: string;
  styledContainer?: React.CSSProperties;
  styledInput?: React.CSSProperties;
  disabled?: boolean;
}

const InputComponent = ({
  control,
  type = 'text',
  name,
  label,
  errorMessage,
  styledContainer,
  styledInput,
  disabled = false,
}: InputComponentProps) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {},
  });

  const hasError = Boolean(errors[name]); // Check for specific field error

  // const dateObject = new Date(field.value);

  // Get YYYY-MM-DD format
  // const formattedDate = dateObject.toISOString().slice(0, 10);
  let formattedDate = '';
  if (field.value) {
    const dateObject = new Date(field.value);
    if (!isNaN(dateObject.getTime())) {
      // Check if valid date
      formattedDate = dateObject.toISOString().slice(0, 10);
    }
  }
  // eslint-disable-next-line no-console
  // console.log(field.name === 'active' ? field.value : 'NONE');
  return (
    <>
      <InputContainer style={styledContainer}>
        <StyledLabel>{label}</StyledLabel>
        {type === 'text' && (
          <>
            <StyledInput
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              inputRef={field.ref}
              value={field.value || ''}
              error={hasError}
              type={type}
              disabled={disabled}
              style={styledInput}
              // label={label}
              // helperText={hasError && errors[name].message} // Display error message
            />
            {hasError && <div style={{ fontSize: '12px', color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
          </>
        )}

        {type === 'checkbox' && (
          <>
            <Switch checked={true} onChange={field.onChange} color="primary" value="dynamic-class-name" />
            {/* <StyledInput
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              inputRef={field.ref}
              value={field.value || ''}
              error={hasError}
              type={'checkbox'}
            //  checked={field.value ? true : false}
              disabled={disabled}
              
              // label={label}
              // helperText={hasError && errors[name].message} // Display error message
            /> */}
            {hasError && <div style={{ fontSize: '12px', color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
          </>
        )}

        {type === 'number' && (
          <>
            <StyledInput
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              inputRef={field.ref}
              value={field.value || ''}
              error={hasError}
              type={'number'}
              disabled={disabled}
              // label={label}
              // helperText={hasError && errors[name].message} // Display error message
            />
            {hasError && <div style={{ fontSize: '12px', color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
          </>
        )}
        {type == 'date' && (
          <>
            <StyledInput
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              inputRef={field.ref}
              value={formattedDate || ''}
              // value={formattedDate || ''}
              error={hasError}
              type={'date'}
              disabled={disabled}
              // label={label}
              // helperText={hasError && errors[name].message} // Display error message
            />
            {hasError && <div style={{ fontSize: '12px', color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
          </>
        )}
      </InputContainer>
    </>
  );
};

export default InputComponent;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
  width: 30%;
`;

const StyledInput = styled(TextField)`
  padding: 10px 20px;
  padding-right: '40px';
  width: 100%;
  box-sizing: border-box;
  border: 1px solid '#D3D3D3';
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
`;

// const EyeIcon = styled.button`
//   position: absolute;
//   top: ${(props) => (props.hasError ? '55%' : '80%')};
//   right: 4px;
//   transform: translateY(-50%);
//   background: none;
//   border: none;
//   cursor: pointer;
// `;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #808080;
  font-size: 13px;
`;

// const IconContainer = styled.div`
//   position: absolute;
//   top: ${(props) => (props.hasError ? '55%' : '70%')};
//   right: 10px;
//   transform: translateY(-50%);
//   color: #ccc;
// `;
