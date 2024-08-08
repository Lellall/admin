/* eslint-disable no-console */
import { useGetShopsQuery } from '../../redux/shops';
import ShopsTable from './shops-table';
import Pagination from 'rc-pagination/lib/Pagination';
import { useState } from 'react';
import ScreenLoader from '../../components/screen-loader';
import MiniLoader from '../../components/mini-loader';
import { useDebounce } from 'react-use';
import SearchInput from '../../components/Inputs/searchInput';
import EmptyState from '../../components/empty-state';

const Shops = () => {
  const [page, setPage] = useState(1);
  const [vendorName, setVendorName] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  useDebounce(
    () => {
      setDebouncedSearchTerm(vendorName);
    },
    500,
    [vendorName]
  );

  const { data, isLoading, isFetching } = useGetShopsQuery({
    page: page - 1,
    size: 10,
    categoryId: '',
    filter: debouncedSearchTerm,
  });

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setVendorName(event.target.value);
  };

  return (
    <>
      <div className="flex justify-between w-full items-center  ">
        <SearchInput placeholder="Who are you looking for?" value={vendorName} onChange={handleSearchChange} />
        {isFetching && <MiniLoader />}
      </div>

      {isLoading ? (
        <ScreenLoader style={{ height: '50vh' }} />
      ) : (
        <>
          <div style={{ width: '100%' }}>{!data.data.length ? <EmptyState /> : <ShopsTable shops={data.data} />}</div>
          <div style={{ float: 'right', margin: '10px' }}>
            {data.data.length ? (
              <Pagination onChange={handlePageClick} current={page} total={data?.resultTotal} />
            ) : null}
          </div>
        </>
      )}
    </>
  );
};
export default Shops;
