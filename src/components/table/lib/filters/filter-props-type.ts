import { TableData } from "../../../../types/table-types";

export type FilterProps<T extends TableData> = {
  handleSetFilters: (filter: { [key: string]: number | string } | null) => void;
  key: keyof T;
  filters: Partial<{
    [key: string]: string | number;
  }> | null;
};
