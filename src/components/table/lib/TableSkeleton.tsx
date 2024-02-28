import { PropsWithChildren } from "react";
import classes from "./styles/table-layout.module.scss";
import cn from "classnames";

export const TableSkeleton = ({ children }: PropsWithChildren) => {
  return <div className={cn(classes["table__skeleton"])}>{children}</div>;
};
