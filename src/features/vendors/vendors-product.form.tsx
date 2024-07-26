import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { Product } from '../../redux/products/typings';
import { useUpdateProductMutation } from '../../redux/products';

interface EditFormProps {
  product: Product;
  fetchProducts?: () => void;
  current?: string;
  setIsOpen?: any;
}

interface Option {
  value: boolean;
  label: string;
}

const VendorsProductForm = ({ product, setIsOpen }: EditFormProps) => {
  const [updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();
  const [selectedOption, setSelectedOption] = useState<Option>(
    product?.available ? { value: true, label: 'Available' } : { value: false, label: 'Unavailable' }
  );
  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState<string>(product?.description);

  const options = [
    { value: true, label: 'Available' },
    { value: false, label: 'Unavailable' },
  ];

  const handleSelectChange = (selectedOption: Option) => {
    setSelectedOption(selectedOption);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    updateProduct({
      description,
      id: product.id,
      isAvailable: selectedOption.value,
      price,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess, setIsOpen]);

  return (
    <Container>
      <RowContainer>
        <ColumnContainer>
          <Label>Status:</Label>
          <StyledSelect options={options} value={selectedOption} onChange={handleSelectChange} />
        </ColumnContainer>
        <ColumnContainer>
          <Label>Price:</Label>
          <PriceInput type="number" min="0" value={price} onChange={handleInputChange} placeholder="Price" />
        </ColumnContainer>
        <ColumnContainer style={{ width: '100%' }}>
          <Label>Description:</Label>
          <DescriptionInput value={description} onChange={handleTextareaChange} placeholder="description" />
        </ColumnContainer>
        <ColumnContainer>
          <SubmitButton disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? 'Updating...' : 'Update'}
          </SubmitButton>
        </ColumnContainer>
      </RowContainer>
    </Container>
  );
};

export default VendorsProductForm;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex-direction: column;
  margin-bottom: 10px;
  gap: 20px;
  align-items: start;
  box-sizing: border-box;

  div {
    width: 100%;
  }
  input {
    width: 100%;
    box-sizing: border-box;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 11px;
  margin-bottom: 5px;
`;

const StyledSelect = styled(Select)`
  width: 200px;
  font-size: 11px;
`;

const PriceInput = styled.input`
  padding: 12px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 4px;
  font-size: 11px;
  width: 100%;
`;
const DescriptionInput = styled.textarea`
  padding: 10px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 4px;
  font-size: 13px;
  height: 100%;
  outline: none;
`;

const SubmitButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007bff')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px 20px;
  margin-top: 17px;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  width: 100%;
`;
