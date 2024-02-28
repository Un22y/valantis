import axios from "axios";
import { API_URL } from "./const";
import { getPassword } from "./utils";
import { FieldParams, FilterParams, IDsRdo, PageFilterParams } from "./type";
import { keepUniqueOnly } from "../helpers/helpers";
import { TableData } from "../types/table-types";

const $server = axios.create({
  baseURL: API_URL,
  headers: {
    "X-Auth": getPassword(new Date()),
  },
});

export const ServerService = {
  filter: async <T extends TableData>(filter: FilterParams<T>) => {
    const {
      data: { result },
    } = await $server.post<{ result: IDsRdo }>("", {
      action: "filter",
      params: { ...filter },
    });
    return result;
  },
  getIds: async (params: PageFilterParams): Promise<IDsRdo> => {
    const {
      data: { result },
    } = await $server.post<{ result: IDsRdo }>("", {
      action: "get_ids",
      params,
    });
    return result;
  },
  getItems: async <T extends { id: string }>(ids: IDsRdo): Promise<T[]> => {
    const {
      data: { result },
    } = await $server.post<{ result: T[] }>("", {
      action: "get_items",
      params: { ids },
    });
    return keepUniqueOnly(result);
  },
  getFields: async <T>(params: FieldParams<T>): Promise<string[]> => {
    const {
      data: { result },
    } = await $server.post<{ result: string[] }>("", {
      action: "get_fields",
      params,
    });
    const uniquie = new Set(result.filter((item) => !!item));
    return [...uniquie];
  },
};
