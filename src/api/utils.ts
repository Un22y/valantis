import { md5 } from "js-md5";
import { PASSWORD } from "./const";

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
