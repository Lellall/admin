import { useEffect } from 'react';
import styled from 'styled-components';
import { Product, productSchema } from '../../redux/products/typings';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputComponent from '../../components/Inputs/input-component';
import ScreenLoader from '../../components/screen-loader';

interface EditFormProps {
  data?: any;
  loading?: boolean; //loading can either be updating or adding
  fetching?: boolean; // fetching is the default is the default loadingState of initial render
  onSubmit: SubmitHandler<Product>;
}

const ShopsProductForm = ({ data, onSubmit, loading, fetching }: EditFormProps) => {
  const {
    handleSubmit,
    control,
    reset,
    // getValues,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: data,
    //@ts-expect-error
    resolver: yupResolver(productSchema),
  });

  const handleFormSubmit: SubmitHandler<Product> = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    reset(data);
  }, [reset, data]);
  // const pricingDetails = getValues().pricingDetails;

  if (fetching) {
    return <ScreenLoader />;
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            disabled
            styledContainer={{ display: 'none' }}
            errorMessage={errors?.id?.message}
            name={'id'}
            control={control}
            label={'ID'}
          />
          <InputComponent errorMessage={errors?.name?.message} name={'name'} control={control} label={'Name'} />
          <InputComponent errorMessage={errors?.price?.message} name={'price'} control={control} label={'Price'} />
          <InputComponent
            errorMessage={errors?.minPurchasePrice?.message}
            name={'minPurchasePrice'}
            control={control}
            label={'Min Purchase Price'}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 mb-5">
          <InputComponent
            errorMessage={errors?.description?.message}
            name={'description'}
            control={control}
            label={'Description'}
            type="textArea"
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
            errorMessage={errors?.quantity?.message}
            name={'quantity'}
            control={control}
            label={'Quantity'}
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
            styledContainer={{ display: 'none' }}
          />
          <InputComponent
            errorMessage={errors?.featured?.message}
            name={'featured'}
            control={control}
            label={'Featured'}
            type="checkbox"
          />
          <InputComponent
            errorMessage={errors?.available?.message}
            name={'available'}
            control={control}
            label={'Available'}
            type="checkbox"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent errorMessage={errors?.weight?.message} name={'weight'} control={control} label={'Weight'} />
          <InputComponent errorMessage={errors?.height?.message} name={'height'} control={control} label={'Height'} />
          <InputComponent errorMessage={errors?.width?.message} name={'width'} control={control} label={'Width'} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent errorMessage={errors?.depth?.message} name={'depth'} control={control} label={'Depth'} />
          <InputComponent errorMessage={errors?.tags?.message} name={'tags.0'} control={control} label={'Tags'} />
          <InputComponent
            errorMessage={errors?.imageUrl?.message}
            name={'imageUrl'}
            control={control}
            label={'ImageUrl'}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            label="Measurement"
            control={control}
            name={`pricingDetails.0.measurement`}
            errorMessage={errors?.pricingDetails?.message}
          />
          <InputComponent
            label="Price"
            control={control}
            name={`pricingDetails.0.price`}
            errorMessage={errors?.pricingDetails?.message}
          />
        </div>

        <SubmitButton type="submit">{loading ? 'Loading...' : 'Submit'}</SubmitButton>
      </form>
    </Container>
  );
};

export default ShopsProductForm;

const Container = styled.div`
  width: 100%;
  overflow: scroll;
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
