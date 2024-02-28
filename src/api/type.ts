export type Headers<T> = keyof T;

export type PageFilterParams = {
  offset?: number;
  limit?: number;
};

export type FilterParams = Partial<{
  field: string;
}> &
  PageFilterParams;

export type FieldParams = FilterParams;

export type IDsRdo = string[];
