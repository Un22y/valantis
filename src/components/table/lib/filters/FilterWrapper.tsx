import { PropsWithChildren, useRef, useState } from "react";
import classes from "./filters.module.scss";
import cn from "classnames";
import { SlArrowDown } from "react-icons/sl";
import { useCloseDroppedWindowListener } from "../../../../hooks/useCloseDroppedWindowListener ";

export const FilterWrapper = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleToggleFilter = () => {
    setOpen((prev) => !prev);
  };
  useCloseDroppedWindowListener(ref, setOpen);
  return (
    <div ref={ref}>
      <button
        onClick={handleToggleFilter}
        className={cn(
          classes["filter__open-button"],
          open && classes["filter__open-button_open"]
        )}
      >
        <SlArrowDown />
      </button>
      <div
        className={cn(
          classes["filter__wrapper"],
          open && classes["filter__wrapper_open"]
        )}
      >
        {open && children}
      </div>
    </div>
  );
};
