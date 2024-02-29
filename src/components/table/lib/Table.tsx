import { useState, useEffect } from "react";
import { ServerService } from "../../../api";
import { useFetching } from "../../../hooks/useFetching";
import { TableData, TableHeaders } from "../../../types/table-types";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import classes from "./styles/table-layout.module.scss";
import { Preloader } from "../../../ui/preloader/Preloader";

type TableProps<T extends TableData> = {
  headers: TableHeaders<T>;
  handleSetFilters: (filter: { [key: string]: number | string } | null) => void;
  ids: string[] | null;
  filters: {
    [key: string]: number | string;
  } | null;
  loading: boolean;
};

export const Table = <T extends TableData>({
  headers,
  handleSetFilters,
  ids,
  filters,
  loading,
}: TableProps<T>) => {
  const [products, setProducts] = useState<T[] | null>(null);
  const [getItems, isLoading] = useFetching(async () => {
    if (!ids) {
      return;
    }
    if (ids.length) {
      const products = await ServerService.getItems<T>(ids);
      setProducts(products);
    }
  });

  useEffect(() => {
    getItems();
  }, [ids]);
  return (
    <div className={classes["table__container"]}>
      <TableHeader<T>
        filters={filters}
        handleSetFilters={handleSetFilters}
        headers={headers}
      />

      <div className={classes["table__content-container"]}>
        {!!products && !products.length && <>Не найдено</>}
        {(isLoading || loading || !products) && (
          <div className={classes["table__preloader-container"]}>
            <Preloader
              className={classes["table__content-preloader"]}
              width={100}
            />
          </div>
        )}
        {(!isLoading || loading) &&
          products &&
          products.map((item) => (
            <TableRow key={item.id} headers={headers} item={item} />
          ))}
      </div>
    </div>
  );
};
