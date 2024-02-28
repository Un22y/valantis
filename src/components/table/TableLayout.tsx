import { useEffect, useMemo, useState } from "react";
import { ServerService } from "../../api";
import { ProductItem } from "../../types/product-type";
import { useFetching } from "../../hooks/useFetching";
import { Table } from "./lib/Table";
import { LIMIT, productTableHeaders } from "../../const/table-const";
import { Pagination } from "../pagination/Pagination";
import classes from "./lib/styles/table-layout.module.scss";

export const Tablelayout = () => {
  const [ids, setIds] = useState<string[] | null>([]);
  const [page, setPage] = useState(1);

  
  const [filters, setFilters] = useState<{
    [key: string]: string | number;
  } | null>(null);
  const [getFilteredIds, isFiltersLoading] = useFetching(async () => {
    if (filters) {
      const ids = await ServerService.filter<ProductItem>(filters);
      console.log(ids);
      setIds(ids);
    }
  });

  const [getIds, isLoading] = useFetching(async () => {
    const ids = await ServerService.getIds({ offset: 0 });
    setIds(ids);
  });

  const handleSetFilters = (
    filter: { [key: string]: number | string } | null
  ) => {
    setFilters(filter);
  };

  const pageIds = useMemo<string[] | null>(() => {
    if (!ids) return null;
    if (ids.length <= LIMIT) return ids;
    const res = ids.slice((page - 1) * LIMIT, LIMIT * page);
    return res;
  }, [page, ids]);

  useEffect(() => {
    setIds(null);
    if (!filters) {
      getIds();
    } else {
      getFilteredIds();
    }
    setPage(1);
  }, [filters]);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <div className={classes["table__layout"]}>
      <div>
        <Table<ProductItem>
          handleSetFilters={handleSetFilters}
          headers={productTableHeaders}
          ids={pageIds}
          filters={filters}
          loading={isFiltersLoading || isLoading}
        />
        <Pagination
          current={page}
          pageSize={LIMIT}
          siblingCount={2}
          totalCount={ids ? ids.length : 1}
          handleChangePage={handleChangePage}
          loading={isFiltersLoading || isLoading}
        />
      </div>
    </div>
  );
};
