import { TableData } from "../../../../types/table-types";
import { LiteralsFilter } from "./LiteralsFilter";
import { NumberFilter } from "./NumberFilter";
import { StringFilter } from "./StringFilter";
import { FilterProps } from "./filter-props-type";

export const filtersMap = {
  string: <T extends TableData>(props: FilterProps<T>) => StringFilter(props),
  number: <T extends TableData>(props: FilterProps<T>) => NumberFilter(props),
  literals: <T extends TableData>(props: FilterProps<T>) =>
    LiteralsFilter(props),
};
