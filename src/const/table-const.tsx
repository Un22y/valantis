import { ProductItem } from "../types/product-type";
import { TableHeaders } from "../types/table-types";

export const productTableHeaders: TableHeaders<ProductItem> = {
  product: {
    name: "Наименование",
    spacing: "3fr",
    element: (item: ProductItem) => <div>{item.product}</div>,
    filter: "string",
  },
  brand: {
    name: "Бренд",
    spacing: "1fr",
    element: (item: ProductItem) => <div>{item.brand}</div>,
    filter: "literals",
  },
  price: {
    name: "Цена",
    spacing: "1fr",
    element: (item: ProductItem) => <div>{item.price}</div>,
    filter: "number",
  },
  id: {
    name: "id",
    spacing: "2fr",
    element: (item: ProductItem) => <div>{item.id}</div>,
  },
};

export const LIMIT = 50;
export const LENGTH = 8004;
