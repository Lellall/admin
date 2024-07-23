import React from 'react';
import styled from 'styled-components';
import { ViewportWidth } from '../../utils/enums';

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function SearchInput({ placeholder, value, onChange }: SearchInputProps) {
  return <InputStyle placeholder={placeholder} value={value} onChange={onChange} />;
}

export default SearchInput;

const InputStyle = styled.input`
  width: 40%;
  height: 30px;
  display: flex;
  padding: 7px 12px 7px 20px;
  outline: none;
  border-radius: 4px;
  background: #f5f5f5;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
  &::placeholder {
    color: #ccc;
    // font-style: italic;
  }

  position: relative;
  @media (max-width: ${ViewportWidth.sm}px) {
    width: 90% !important;
    // padding: 10px 16px !important;
  }
`;
