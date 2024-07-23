import { useParams } from 'react-router-dom';
import { useGetSingleShopQuery } from '../../redux/shops';
import { Shop } from '../../redux/shops/typings';
import VendorForm from './vendor-form';

import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Vendor = () => {
  const { id } = useParams();
  const { data } = useGetSingleShopQuery({ id });
  const navigate = useNavigate();
  const handleUserUpdate = (updatedData: Shop) => {
    // Implement logic to update user data on the backend (e.g., using axios)
    // eslint-disable-next-line no-console
    console.log('Updated user data:', updatedData);
  };

  return (
    <>
      <button onClick={() => navigate(-1)}>
        {' '}
        <ArrowBack />
      </button>
      <div className="flex items-center flex-col justify-around min-h-[50vh] w-[100%] ">
        <VendorForm onSubmit={handleUserUpdate} vendorData={data} />
      </div>
    </>
  );
};

export default Vendor;
