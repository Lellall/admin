import { useParams } from 'react-router-dom';
import { useGetSingleShopQuery } from '../../redux/shops';
import VendorForm from './vendor-form';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Vendor = () => {
  const { id } = useParams();
  const { data } = useGetSingleShopQuery({ id });
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-start flex-col justify-around min-h-[50vh] w-[95%]">
        <div className="flex justify-between w-full">
          <button className="px-5 py-2" onClick={() => navigate(-1)}>
            <ArrowBack />
          </button>

          <button className="px-5 py-2" onClick={() => navigate(`/vendors-products`)}>
            <WysiwygIcon />
          </button>
        </div>

        <VendorForm vendorData={data} />
      </div>
    </>
  );
};

export default Vendor;
// walin ganye founders  2nd week august engagrment later
