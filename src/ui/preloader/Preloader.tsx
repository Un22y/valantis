import { ImSpinner9 } from "react-icons/im";
import classes from "./preloader.module.scss";
import cn from "classnames";
import { SVGProps } from "react";

export const Preloader = (svgProps: SVGProps<SVGSVGElement>) => {
  const { className, width } = svgProps;
  return (
    <ImSpinner9
      {...svgProps}
      size={width}
      className={cn(classes["preloader"], className)}
      color="currentColor"
    />
  );
};
