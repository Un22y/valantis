import React, { useEffect, useState } from "react";
import { FilterProps } from "./filter-props-type";
import { TableData } from "../../../../types/table-types";
import classes from "./filters.module.scss";
import { Input } from "../../../../ui";

export const NumberFilter = <T extends TableData>({
  handleSetFilters,
  key,
  filters,
}: FilterProps<T>) => {
  const filterValue =
    filters && Object.keys(filters).includes(String(key))
      ? Number(filters[key])
      : null;
  const [value, setValue] = useState<number | null>(filterValue);
  useEffect(() => {
    setValue(filterValue);
  }, [filterValue]);

  const handleChangeValue: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(Number(value));
  };

  return (
    <div>
      <form
        className={classes["filter__wrapper-inner"]}
        onSubmit={(event) => {
          event.preventDefault();
          handleSetFilters(value ? { [key]: value } : null);
        }}
      >
        <Input
          className={classes["filter__input"]}
          value={value ? value : ""}
          type="text"
          onChange={handleChangeValue}
        />
        <div className={classes["filter__apply-wrapper"]}>
          <button
            data-action="apply"
            className={classes["filter__apply-button"]}
            type="submit"
          >
            Применить
          </button>
          <button
            data-action="clear"
            className={classes["filter__apply-button"]}
            type="button"
            onClick={() => handleSetFilters(null)}
          >
            Сбросить
          </button>
        </div>
      </form>
    </div>
  );
};
