export type TableData = {
  id: string;
  [key: string]: unknown;
};

export type TableHeaders<T extends TableData> = {
  [key in keyof T]: TableHeaderItem<T>;
};

export type TableHeaderItem<T extends TableData> = {
  name: string;
  spacing: string;
  element: (item: T) => JSX.Element;
  filter?: FilterType;
};

export type FilterType = "string" | "number" | "literals";

export type FilterComponentsMap = {
  str: ({
    applyChanges,
    headerKey,
    value,
  }: {
    applyChanges: (filterValue: string, headerKey: string) => void;
    headerKey: string;
    value: string;
  }) => JSX.Element;
  date: () => React.JSX.Element;
  literals: ({
    dictionary,
    labelsMap,
    applyChanges,
    headerKey,
  }: {
    dictionary: readonly string[];
    labelsMap: { [x: string]: string };
    applyChanges: (filterValue: string, headerKey: string) => void;
    headerKey: string;
  }) => JSX.Element;
};
