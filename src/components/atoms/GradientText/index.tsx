import React from 'react';

export type GradientOwnProps<E extends React.ElementType = 'div'> = {
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
  const Component = as || 'div';

  return (
    <Component
      {...otherProps}
      className={`w-max bg-gradient-to-br from-slate-50/80 from-10% via-slate-100/60 via-30% to-slate-700/90 to-60% bg-clip-text text-transparent ${
        className || ''
      }`}
    >
      {children}
    </Component>
  );
};
