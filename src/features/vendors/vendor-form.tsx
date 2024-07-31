/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Shop } from '../../redux/shops/typings';
import { yupResolver } from '@hookform/resolvers/yup';
import InputComponent from '../../components/Inputs/input-component';
import * as yup from 'yup';
import styled from 'styled-components';
import { useGetShopQuery, useUpdateShopMutation } from '../../redux/shops/shops.api';
import MiniLoader from '../../components/mini-loader';
import { useParams } from 'react-router-dom';

const VendorForm = () => {
  const { id } = useParams();
  const { data: vendorData } = useGetShopQuery({ id });
  const [updateVendor, { isLoading: isUpdating }] = useUpdateShopMutation();
  const {
    // register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Shop>({
    defaultValues: vendorData,
    // @ts-expect-error
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(vendorData);
  }, [reset, vendorData]);

  const handleFormSubmit: SubmitHandler<Shop> = (data) => {
    const { market, category, openingTime, closingTime, metadata, createdAt, updatedAt, ...restData } = data;
    const dataToSubmit = {
      ...restData,
      marketId: market?.id,
      categoryId: category.id,
      paystackAccountId: metadata.PAYSTACK_ACCOUNT_CODE,
    };
    updateVendor({ id: data.id, ...dataToSubmit });
  };

  return (
    <form className="w-[100%] px-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className=" w-[100%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent disabled errorMessage={errors?.id?.message} name={'id'} control={control} label={'ID'} />
          <InputComponent
            errorMessage={errors?.description?.message}
            name={'description'}
            control={control}
            label={'Description'}
          />
          <InputComponent
            errorMessage={errors?.logoUrl?.message}
            name={'logoUrl'}
            control={control}
            label={'Logo URL'}
            type={'text'}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent errorMessage={errors?.name?.message} name={'name'} control={control} label={'Name'} />
          <InputComponent
            errorMessage={errors?.address?.message}
            name={'address'}
            control={control}
            label={'Address'}
          />
          <InputComponent errorMessage={errors?.status?.message} name={'status'} control={control} label={'Status'} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            errorMessage={errors?.inventory?.message}
            name={'inventory'}
            control={control}
            label={'Inventory'}
            type={'number'}
          />
          <InputComponent
            errorMessage={errors?.active?.message}
            name={'active'}
            control={control}
            label={'Active'}
            type={'checkbox'}
          />
          <InputComponent
            errorMessage={errors?.timeZone?.message}
            name={'timeZone'}
            control={control}
            label={'Timezone'}
            disabled
          />
        </div>

        {/* <HeaderTitle>Category</HeaderTitle> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            errorMessage={errors?.category?.id?.message}
            name={'category.id'}
            control={control}
            label={'Category ID'}
            disabled
          />
          <InputComponent
            errorMessage={errors?.vatCharge?.message}
            name={'vatCharge'}
            control={control}
            label={'VAT Charge'}
            type={'number'}
          />
          <InputComponent
            errorMessage={errors?.market?.id?.message}
            name={'market.id'}
            control={control}
            label={'Market ID'}
            disabled
          />
        </div>

        <section className="hidden">
          <HeaderTitle>Opening Time</HeaderTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
            <InputComponent
              errorMessage={errors?.openingTime?.hour?.message}
              name={'openingTime.hour'}
              control={control}
              label={'Hour'}
              type={'number'}
              disabled
            />
            <InputComponent
              errorMessage={errors?.openingTime?.minute?.message}
              name={'openingTime.minute'}
              control={control}
              label={'Minute'}
              type={'number'}
              disabled
            />
            <InputComponent
              errorMessage={errors?.openingTime?.second?.message}
              name={'openingTime.second'}
              control={control}
              label={'Second'}
              type={'number'}
              disabled
            />
          </div>

          <InputComponent
            errorMessage={errors?.openingTime?.nano?.message}
            name={'openingTime.nano'}
            control={control}
            label={'Nano'}
            type={'number'}
            disabled
          />
        </section>

        <section className="hidden">
          <HeaderTitle>Closing Time</HeaderTitle>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
            <InputComponent
              errorMessage={errors?.closingTime?.hour?.message}
              name={'closingTime.hour'}
              control={control}
              label={'Hour'}
              type={'time'}
            />
            <InputComponent
              errorMessage={errors?.closingTime?.minute?.message}
              name={'closingTime.minute'}
              control={control}
              label={'Minute'}
              type={'number'}
              disabled
            />
            <InputComponent
              errorMessage={errors?.closingTime?.second?.message}
              name={'closingTime.second'}
              control={control}
              label={'Second'}
              type={'number'}
              disabled
            />
            {/* </div> */}
            <InputComponent
              errorMessage={errors?.closingTime?.nano?.message}
              name={'closingTime.nano'}
              control={control}
              label={'Nano'}
              type={'number'}
              disabled
            />
          </div>
        </section>

        {/* <HeaderTitle>Coordinate</HeaderTitle> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            errorMessage={errors?.coordinate?.latitude.message}
            name={'coordinate.latitude'}
            control={control}
            label={'Latitude'}
            type={'number'}
          />
          <InputComponent
            errorMessage={errors?.coordinate?.longitude?.message}
            name={'coordinate.longitude'}
            control={control}
            label={'Longitude'}
            type={'number'}
          />
        </div>
      </div>
      <button className="bg-[green] flex justify-center p-2 w-full mb-4" type="submit">
        {isUpdating ? <MiniLoader /> : 'Submit'}
      </button>
    </form>
  );
};

export default VendorForm;

const HeaderTitle = styled.h3`
  padding: 10px 0px;
  margin-top: 15px;
  @media screen and (max-width: 765px) {
    width: 90%;
    margin: 10px auto;
  }
`;

const schema = yup.object().shape({
  id: yup.string().required('ID is required'),
  description: yup.string().required('Description is required'),
  logoUrl: yup.string().url('Logo URL must be a valid URL').required('Logo URL is required'),
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  status: yup.string().required('Status is required'),
  inventory: yup.number().required('Inventory is required'),
  active: yup.boolean().required('Active status is required'),
  createdAt: yup.string().required('Created at date is required'),
  updatedAt: yup.string().required('Updated at date is required'),
  timeZone: yup.string().required('Timezone is required'),
  categoryId: yup.string(),
  openingTime: yup.object().shape({
    hour: yup.number().nullable(),
    minute: yup.number().nullable(),
    second: yup.number().nullable(),
    nano: yup.number().nullable(),
  }),
  closingTime: yup.object().shape({
    hour: yup.number().nullable(),
    minute: yup.number().nullable(),
    second: yup.number().nullable(),
    nano: yup.number().nullable(),
  }),
  subAccountId: yup.string().required('Subaccount ID is required'),
  vatCharge: yup.number().required('VAT charge is required'),
  marketId: yup.string(),
  coordinate: yup.object().shape({
    latitude: yup.number().required('Latitude is required'),
    longitude: yup.number().required('Longitude is required'),
  }),
});
