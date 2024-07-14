import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Shop } from '../../redux/shops/typings';
import InputWithIcon from '../../components/Inputs/input';
interface VendorFormProps {
  vendorData: Shop;
  onSubmit: (data: Shop) => void;
}

const VendorForm: React.FC<VendorFormProps> = ({ vendorData, onSubmit }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Shop>({
    defaultValues: vendorData,
  });

  useEffect(() => {
    reset(vendorData);
  }, [reset, vendorData]);
  // Define the type of data for the onSubmit handler
  const handleFormSubmit: SubmitHandler<Shop> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <InputWithIcon
          {...register('name')}
          type={'text'}
          errorMessage={errors?.name?.message}
          label={'Name'}
          icon={'User'}
          name="name"
          hasError={errors?.name?.message}
        />
        <input id="name" className="border" {...register('name', { required: 'Name is required' })} />
        {errors.name && <p>{errors?.name?.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default VendorForm;
