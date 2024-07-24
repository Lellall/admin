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
    // eslint-disable-next-line no-console
    console.log('Updated user data:', updatedData);
  };

  return (
    <>
      <div className="flex  items-start flex-col justify-around min-h-[50vh] w-[95%] ">
        <button className="px-5 py-2" onClick={() => navigate(-1)}>
          <ArrowBack />
        </button>
        <VendorForm onSubmit={handleUserUpdate} vendorData={data} />
      </div>
    </>
  );
};

export default Vendor;
