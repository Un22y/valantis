import { md5 } from "js-md5";
import { PASSWORD } from "./const";
import { FieldParams } from "./type";
import { TableData } from "../types/table-types";

export const getPassword = (date: Date): string => {
  const year = date.getFullYear();
  const month =
    String(date.getMonth() + 1).length === 1
      ? `0${String(date.getMonth() + 1)}`
      : String(date.getMonth() + 1);
  const day = date.getDate();
  const password = md5(`${PASSWORD}_${year}${month}${day}`);

  return password;
};

export const setResponseIntoState = <T, U extends TableData>(
  setState: React.Dispatch<React.SetStateAction<T | null>>,
  callback: <U>(params: FieldParams<U>) => Promise<T>,
  args: FieldParams<U>
): (() => Promise<void>) => {
  return async () => {
    const result = await callback(args);

    setState(result);
  };
};
