/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { Product } from '../../redux/products/typings';
import { useUpdateShopProductMutation } from '../../redux/shops/shops.api';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputComponent from '../../components/Inputs/input-component';

interface EditFormProps {
  product: Product;
  fetchProducts?: () => void;
  current?: string;
  setIsOpen?: any;
}

const VendorsProductForm = ({ product, setIsOpen }: EditFormProps) => {
  const [updateProduct, { isLoading, isSuccess }] = useUpdateShopProductMutation();

  const {
    // register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: product,
    // @ts-expect-error
    resolver: yupResolver(productSchema),
  });

  const handleFormSubmit = () => {
    // updateProduct({});
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess, setIsOpen]);

  return (
    <Container>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent disabled errorMessage={errors?.id?.message} name={'id'} control={control} label={'ID'} />
          <InputComponent
            disabled
            errorMessage={errors?.name?.message}
            name={'name'}
            control={control}
            label={'Name'}
          />
          <InputComponent errorMessage={errors?.price?.message} name={'price'} control={control} label={'Price'} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            errorMessage={errors?.minPurchasePrice?.message}
            name={'minPurchasePrice'}
            control={control}
            label={'Min Purchase Price'}
          />
          <InputComponent
            errorMessage={errors?.description?.message}
            name={'description'}
            control={control}
            label={'Description'}
          />
          <InputComponent
            errorMessage={errors?.quantity?.message}
            name={'quantity'}
            control={control}
            label={'Quantity'}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            errorMessage={errors?.inventory?.message}
            name={'inventory'}
            control={control}
            label={'Inventory'}
          />
          <InputComponent
            errorMessage={errors?.imageUrl?.message}
            name={'imageUrl'}
            control={control}
            label={'ImageUrl'}
          />
          <InputComponent
            errorMessage={errors?.discount?.message}
            name={'discount'}
            control={control}
            label={'Discount'}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            disabled
            errorMessage={errors?.currency?.message}
            name={'currency'}
            control={control}
            label={'Currency'}
          />
          <InputComponent
            errorMessage={errors?.featured?.message}
            name={'featured'}
            control={control}
            label={'Featured'}
          />
          <InputComponent
            errorMessage={errors?.available?.message}
            name={'available'}
            control={control}
            label={'Available'}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent errorMessage={errors?.weight?.message} name={'weight'} control={control} label={'Weight'} />
          <InputComponent errorMessage={errors?.height?.message} name={'height'} control={control} label={'Height'} />
          <InputComponent errorMessage={errors?.width?.message} name={'width'} control={control} label={'Width'} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent errorMessage={errors?.depth?.message} name={'depth'} control={control} label={'Depth'} />
          <InputComponent errorMessage={errors?.tags?.message} name={'tags'} control={control} label={'Tags'} />
          <InputComponent errorMessage={errors?.id?.message} name={'id'} control={control} label={'ID'} />
        </div>
      </form>
      <SubmitButton>Clicked</SubmitButton>
    </Container>
  );
};

export default VendorsProductForm;

const Container = styled.div`
  /* display: flex; */
  /* justify-content: center; */
  width: 100%;
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

const productSchema = yup.object().shape({
  id: yup.string().required('ID is required'),
  name: yup.string().required('Name is required'),
  price: yup.number().required('Price is required').positive('Price must be a positive number'),
  minPurchasePrice: yup
    .number()
    .required('Minimum purchase price is required')
    .positive('Minimum purchase price must be a positive number'),
  description: yup.string().required('Description is required'),
  quantity: yup
    .number()
    .required('Quantity is required')
    .integer('Quantity must be an integer')
    .min(0, 'Quantity cannot be negative'),
  inventory: yup
    .number()
    .required('Inventory is required')
    .integer('Inventory must be an integer')
    .min(0, 'Inventory cannot be negative'),
  imageUrl: yup.string().url('Image URL must be a valid URL').required('Image URL is required'),
  discount: yup
    .number()
    .required('Discount is required')
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot exceed 100'),
  currency: yup.string().required('Currency is required'),
  featured: yup.boolean().required('Featured status is required'),
  available: yup.boolean().required('Availability status is required'),
  manufacturer: yup.string().required('Manufacturer is required'),
  weight: yup.number().required('Weight is required').positive('Weight must be a positive number'),
  height: yup.number().required('Height is required').positive('Height must be a positive number'),
  width: yup.number().required('Width is required').positive('Width must be a positive number'),
  depth: yup.number().required('Depth is required').positive('Depth must be a positive number'),
  createdAt: yup.string().optional().nullable(),
  updatedAt: yup.string().optional().nullable(),
  tags: yup.array().of(yup.string()).required('Tags are required').min(1, 'At least one tag is required'),
  shop: yup
    .object()
    .shape({
      // Define the schema for Shop if needed
    })
    .nullable(),
  category: yup
    .object()
    .shape({
      // Define the schema for Category if needed
    })
    .nullable(),
  pricingDetails: yup
    .array()
    .of(
      yup.object().shape({
        measurement: yup.string().required('Measurement is required'),
        price: yup.number().required('Price is required').positive('Price must be a positive number'),
      })
    )
    .optional()
    .nullable(),
});
