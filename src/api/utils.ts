import { md5 } from "js-md5";
import { PASSWORD } from "./const";

export const getPassword = (): string => {
  const today = new Date();
  const hoursDelta = today.getTimezoneOffset() / 60;
  const grinvichTime = new Date(Date.now() + hoursDelta * 60 * 60 * 1000);
  const year = grinvichTime.getFullYear();
  const month =
    String(grinvichTime.getMonth() + 1).length === 1
      ? `0${String(grinvichTime.getMonth() + 1)}`
      : String(grinvichTime.getMonth() + 1);
  const day =
    String(grinvichTime.getDate()).length === 1
      ? `0${String(grinvichTime.getDate())}`
      : String(grinvichTime.getDate());
  const password = md5(`${PASSWORD}_${year}${month}${day}`);

  return password;
};
