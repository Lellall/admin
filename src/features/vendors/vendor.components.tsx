import { useParams } from 'react-router-dom';
import { useGetSingleShopQuery } from '../../redux/shops';
import VendorForm from './vendor-form';

import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Vendor = () => {
  const { id } = useParams();
  const { data } = useGetSingleShopQuery({ id });
  const navigate = useNavigate();

  return (
    <>
      <div className="flex  items-start flex-col justify-around min-h-[50vh] w-[95%] ">
        <button className="px-5 py-2" onClick={() => navigate(-1)}>
          <ArrowBack />
        </button>
        <VendorForm vendorData={data} />
      </div>
    </>
  );
};

export default Vendor;
