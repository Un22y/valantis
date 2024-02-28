import React from "react";
import {
  TableData,
  TableHeaderItem,
  TableHeaders,
} from "../../../types/table-types";
import { getGridSpacing } from "../../../helpers/helpers";
import classes from './styles/table-layout.module.scss'

export type TableRowProps<T extends TableData> = {
  headers: TableHeaders<T>;
  item: T;
};

export const TableRow = <T extends TableData>({
  headers,
  item,
}: TableRowProps<T>) => {
  return (
    <div
      className={classes['table__row']}
      style={{ display: "grid", gridTemplateColumns: getGridSpacing(headers) }}
    >
      {Object.values<TableHeaderItem<T>>(headers).map(({ element }, index) => (
        <div className={classes['table__cell']} key={index}>{element(item)}</div>
      ))}
    </div>
  );
};
