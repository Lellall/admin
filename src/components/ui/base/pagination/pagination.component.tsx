import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { usePagination, DOTS } from './use-pagination';
import { PageRange } from './pagination.styles';

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <PageRange>
      <div
        className={`pagination-item ${
          currentPage === 1 ? 'disabled' : 'active'
        }`}
        onClick={onPrevious}
      >
        <IoIosArrowBack className='' />
      </div>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <div className='pagination-item dots' key={i}>
              &#8230;
            </div>
          );
        }

        return (
          <div
            className={`pagination-item ${
              pageNumber === currentPage ? 'selected' : 'unselected'
            }`}
            key={i}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </div>
        );
      })}
      <div
        className={`pagination-item ${
          currentPage === lastPage ? 'disabled' : 'active'
        }`}
        onClick={onNext}
      >
        <IoIosArrowForward />
      </div>
    </PageRange>
  );
};

export default Pagination;
