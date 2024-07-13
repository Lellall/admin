import { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { Product } from "../../redux/products/typings";
import { useUpdateProductMutation } from "../../redux/products";

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
  margin-bottom: 10px;
  @media screen and (max-width: 760px) {
    flex-direction: column;
    gap: 20px;
    align-items: start;
    div {
      width: 100%;
    }
    input {
      width: 100%;
      box-sizing: border-box;
    }
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  /* background: red; */
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
  width: 100px;
`;
const DescriptionInput = styled.textarea`
  padding: 5px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 4px;
  font-size: 11px;
  height: 43px;
  outline: none;
  /* width: 100px; */
  /* background: red; */
  @media screen and (max-width: 760px) {
    height: 60px;
  }
`;

const SubmitButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  padding: 12px 20px;
  margin-top: 17px;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 11px;
`;

interface EditFormProps {
  product: Product;
  fetchProducts?: () => void;
  current?: string;
}

const EditForm = ({ product }: EditFormProps) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [selectedOption, setSelectedOption] = useState(
    product?.available
      ? { value: true, label: "Available" }
      : { value: false, label: "Unavailable" }
  );
  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState(product?.description);

  const options = [
    { value: true, label: "Available" },
    { value: false, label: "Unavailable" },
  ];

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleDescriptionChange = (e) => {
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

  return (
    <Container>
      <RowContainer>
        <ColumnContainer>
          <Label>Status:</Label>
          <StyledSelect
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
          />
        </ColumnContainer>
        <ColumnContainer>
          <Label>Price:</Label>
          <PriceInput
            type="number"
            min="0"
            value={price}
            onChange={handlePriceChange}
            placeholder="Price"
          />
        </ColumnContainer>
        <ColumnContainer style={{ width: "100%" }}>
          <Label>Description:</Label>
          <DescriptionInput
            value={description}
            onChange={handleDescriptionChange}
            placeholder="description"
          />
        </ColumnContainer>
        <ColumnContainer>
          <SubmitButton disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? "Updating..." : "Update"}
          </SubmitButton>
        </ColumnContainer>
      </RowContainer>
    </Container>
  );
};

export default EditForm;
