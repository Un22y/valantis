import React, { DetailedHTMLProps, forwardRef } from "react";

type InputProps = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { ref: React.Ref<HTMLInputElement> };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ref, ...props }: InputProps) => {
    const { value, onChange, type, className } = props;
    return (
      <input
        ref={ref}
        className={className}
        value={value}
        type={type}
        onChange={onChange}
      />
    );
  }
);
