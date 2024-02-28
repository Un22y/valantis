import React, { Key } from "react";
import { TableData, TableHeaders } from "../../../types/table-types";
import { getGridSpacing } from "../../../helpers/helpers";
import { filtersMap } from "./filters/filters-map";
import { FilterWrapper } from "./filters/FilterWrapper";
import classes from "../lib/styles/table-layout.module.scss";

type TableHeadersProps<T extends TableData> = {
  headers: TableHeaders<T>;
  handleSetFilters: (filter: { [key: string]: number | string } | null) => void;
  filters: Partial<{
    [key: string]: string | number;
  }> | null;
};

export const TableHeader = <T extends TableData>({
  headers,
  handleSetFilters,
  filters,
}: TableHeadersProps<T>) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: getGridSpacing(headers),
        position: "sticky",
        top: 0,
      }}
    >
      {Object.entries<TableHeaders<T>>(headers).map(
        ([key, { name, filter: filterType }]) => {
          return (
            <div className={classes["table__header"]} key={key as Key}>
              <h3>{name}</h3>

              {filterType && (
                <FilterWrapper>
                  {filtersMap[filterType]<T>({
                    handleSetFilters,
                    key,
                    filters: { ...filters },
                  })}
                </FilterWrapper>
              )}
            </div>
          );
        }
      )}
    </div>
  );
};
