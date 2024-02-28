export type Headers<T> = keyof T;

export type PageFilterParams = {
  offset?: number;
  limit?: number;
};

export type FilterParams<T> = Partial<{
  [key: string in keyof Omit<T, "id">]: T[key];
}> &
  PageFilterParams;

//   [key: string in keyof Omit<T, "id">]: T[key];


export type FieldParams<T> = FilterParams<T>;

export type IDsRdo = string[];
