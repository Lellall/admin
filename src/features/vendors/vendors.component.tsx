/* eslint-disable no-console */
import { useGetShopsQuery } from "../../redux/shops";
import VendorsTable from "./vendors-table";
import Pagination from "rc-pagination/lib/Pagination";
import { useState } from "react";
import { SearchInp } from "../../components/ui/base/navbar/navbar.styles";
import ScreenLoader from "../../components/screen-loader";
import MiniLoader from "../../components/mini-loader";
import { useDebounce } from "react-use";

const Vendor = () => {
  const [page, setPage] = useState(1);
  const [vendorName, setVendorName] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  useDebounce(
    () => {
      setDebouncedSearchTerm(vendorName);
    },
    500,
    [vendorName]
  );

  const { data, isLoading, isFetching } = useGetShopsQuery({
    page,
    size: 10,
    categoryId: "",
    filter: debouncedSearchTerm,
  });

  console.log("data", data);

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
    // refetch(pageNumber);
  };

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setVendorName(event.target.value);
  };
  return (
    <>
      <div className="flex justify-between w-full items-center  ">
        <SearchInp
          type="text"
          placeholder="Who are you looking for?"
          value={vendorName}
          onChange={handleSearchChange}
        />
        {isFetching && <MiniLoader />}
      </div>

      {isLoading ? (
        <ScreenLoader style={{ height: "50vh" }} />
      ) : (
        <>
          <div style={{ width: "100%" }}>
            <VendorsTable vendors={data.data} />
          </div>
          <div style={{ float: "right", margin: "10px" }}>
            <Pagination
              onChange={handlePageClick}
              current={page}
              total={data?.resultTotal}
            />
          </div>
        </>
      )}
    </>
  );
};
export default Vendor;
