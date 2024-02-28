import { DOTS, usePagination } from "./usePagination";
import classes from "./pagination.module.scss";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import cn from "classnames";

type PaginationProps = {
  handleChangePage: (page: number) => void;
  totalCount: number;
  current: number;
  pageSize: number;
  siblingCount: number;
  loading: boolean;
};

export const Pagination = ({
  handleChangePage,
  totalCount,
  current,
  pageSize,
  siblingCount,
  loading,
}: PaginationProps) => {
  const paginationRange = usePagination({
    totalCount,
    current,
    pageSize,
    siblingCount,
  });
  if (current === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    handleChangePage(current + 1);
  };

  const onPrevious = () => {
    handleChangePage(current - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={classes["pagination__wrapper"]}>
      <li className={classes["pagination__item"]}>
        <button
          className={classes["pagination__button"]}
          disabled={current === 1 || loading}
          onClick={onPrevious}
        >
          <SlArrowLeftCircle />
        </button>
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber} className={classes["pagination__item"]}>
              <span>&#8230;</span>
            </li>
          );
        }
        return (
          <li
            className={cn(
              classes["pagination__item"],
              pageNumber === current && classes["pagination__item_selected"]
            )}
            key={pageNumber}
            onClick={() => handleChangePage(pageNumber)}
          >
            <button
              disabled={current === pageNumber || loading}
              className={classes["pagination__button"]}
            >
              <span>{pageNumber}</span>
            </button>
          </li>
        );
      })}
      <li className={classes["pagination__item"]}>
        <button
          className={classes["pagination__button"]}
          disabled={current === lastPage || loading}
          onClick={onNext}
        >
          <SlArrowRightCircle />
        </button>
      </li>
    </ul>
  );
};
