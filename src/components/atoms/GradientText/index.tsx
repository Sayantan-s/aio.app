import React from "react";

export type GradientOwnProps<E extends React.ElementType = "div"> = {
  children: React.ReactNode;
  as?: E;
};

export type GradientProps<E extends React.ElementType> = GradientOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof GradientOwnProps<E>>;

export const GradientText = <E extends React.ElementType>({
  children,
  as,
  className,
  ...otherProps
}: GradientProps<E>) => {
  const Component = as || "div";

  return (
    <Component
      {...otherProps}
      className={`w-max text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/60 to-60% to-slate-700/90 ${
        className || ""
      }`}
    >
      {children}
    </Component>
  );
};
