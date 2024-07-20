// import { useParams } from 'react-router-dom';
// import { useGetSingleShopQuery } from '../../redux/shops';
// import { Shop } from '../../redux/shops/typings';
// import VendorForm from './vendor-form';

import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Vendor = () => {
  // const { id } = useParams();
  // const { data } = useGetSingleShopQuery({ id });
  const navigate = useNavigate();
  // const handleUserUpdate = (updatedData: Shop) => {
  //   // Implement logic to update user data on the backend (e.g., using axios)
  //   console.log('Updated user data:', updatedData);
  // };

  return (
    <>
      <button onClick={() => navigate(-1)}>
        {' '}
        <ArrowBack /> Back
      </button>
      <div className="flex items-center flex-col justify-around h-[50vh]">
        <h3>Coming Soon...</h3>
        <p>You will be able to update vendors info such availabilty opening & closing time and much more...</p>
        {/* <VendorForm onSubmit={handleUserUpdate} vendorData={data} /> */}
      </div>
    </>
  );
};

export default Vendor;
