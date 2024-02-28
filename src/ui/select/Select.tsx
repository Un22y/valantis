import cn from "classnames";
import { createRef, useState } from "react";
import { useCloseDroppedWindowListener } from "../../hooks/useCloseDroppedWindowListener ";
import classes from "./selectPrimeList.module.scss";
import { SlArrowDown } from "react-icons/sl";

type SelectPrimeListProps = {
  selected: string | "none";
  options: string[] | null;
  changeSelect: (arg: string) => void;
};

export const Select = ({
  options,
  selected,
  changeSelect,
}: SelectPrimeListProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = createRef<HTMLDivElement>();

  const handleChangeSelect = (option: string): void => {
    setIsOpen(false);
    changeSelect(option);
  };
  useCloseDroppedWindowListener(rootRef, setIsOpen);

  return (
    <div
      className={cn(
        classes["select__wrapper"],
        isOpen && classes["select__wrapper_open"]
      )}
      ref={rootRef}
    >
      <button
        className={classes["select__arrow-button"]}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={cn(classes["select__title"])}>
          {selected === "none" ? "Показать все" : selected}
        </span>
        <SlArrowDown
          className={cn(
            classes["select__arrow-icon"],
            isOpen && classes["select__arrow-icon_open"]
          )}
        />
      </button>
      <ul
        className={cn(classes["select__list"], {
          [classes["select__list_active"]]: isOpen,
        })}
      >
        <li
          className={cn(classes["select__option"], {
            [classes["select__option_selected"]]: selected === "none",
          })}
          onClick={() => handleChangeSelect("none")}
        >
          Показать все
        </li>
        {options &&
          options.map((option) => (
            <li
              title={option}
              key={option}
              className={cn(classes["select__option"], {
                [classes["select__option_selected"]]: option === selected,
              })}
              onClick={() => handleChangeSelect(option)}
            >
              {option}
            </li>
          ))}
      </ul>
    </div>
  );
};
