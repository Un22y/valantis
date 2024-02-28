import React, { useEffect, useState } from "react";
import { FilterProps } from "./filter-props-type";
import { TableData } from "../../../../types/table-types";
import { useFetching } from "../../../../hooks/useFetching";
import { ServerService } from "../../../../api";
import classes from "./filters.module.scss";
import { Select } from "../../../../ui";

export const LiteralsFilter = <T extends TableData>({
  handleSetFilters,
  key,
  filters,
}: FilterProps<T>) => {
  const filterValue =
    filters && Object.keys(filters).includes(String(key))
      ? String(filters[key])
      : "none";
  const [listValue, setListValue] = useState<string>(filterValue);
  useEffect(() => {
    setListValue(filterValue);
    console.log("filterValue", filterValue);
  }, [filterValue]);

  const [list, setList] = useState<string[] | null>(null);
  const params = { field: key };
  useEffect(() => {
    getList();
  }, []);

  const [getList, isLoading] = useFetching(async () => {
    const list = await ServerService.getFields<T>(params);
    setList(list);
  });

  const handleSelectValue = (value: string) => {
    handleSetFilters(value !== "none" ? { [key]: value } : null);
  };

  return (
    <div className={classes["filter__wrapper-inner"]}>
      {!isLoading && (
        <Select
          changeSelect={handleSelectValue}
          options={list}
          selected={listValue}
        />
      )}
      <button
        data-action="clear"
        className={classes["filter__apply-button"]}
        type="button"
        onClick={() => handleSetFilters(null)}
      >
        Сбросить
      </button>
    </div>
  );
};
