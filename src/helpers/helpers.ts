import { TableData, TableHeaders } from "../types/table-types";

export const keepUniqueOnly = <T extends { id: string }>(
  arr: Array<T>
): T[] => {
  const uniqueIds: string[] = [];
  return arr.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);

      return true;
    }

    return false;
  });
};
export const getGridSpacing = <T extends TableData>(
  headers: TableHeaders<T>
): string => {
  return `${Object.values(headers).reduce((acc, item) => {
    return acc + item.spacing + " ";
  }, "")}`;
};
