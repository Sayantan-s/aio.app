import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Fragment, type FC, type PropsWithChildren } from 'react';

interface Props extends PropsWithChildren, VariantProps<typeof stylesParent> {
  hoverGradient?: boolean;
  className?: string;
}

const stylesParent = cva(`rounded-lg overflow-hidden`, {
  variants: {
    bordered: {
      true: 'from-10% via-40% to-50% bg-gradient-to-br via-slate-900/10 p-[1.5px] dark:from-slate-800/30 dark:to-slate-900/5',
      false: 'flex flex-1 flex-col dark:bg-slate-900/50',
    },
    fullWidth: { true: 'w-full' },
  },
  defaultVariants: { bordered: false },
});

const stylesChild = cva('rounded-lg overflow-hidden', {
  variants: {
    bordered: {
      true: 'flex flex-1 flex-col dark:bg-slate-900',
    },
  },
  defaultVariants: { bordered: false },
});

export const Card: FC<Props> = ({ bordered, children, className, fullWidth }) => {
  return (
    <figure className={stylesParent({ bordered, fullWidth })}>
      {bordered ? (
        <div className={stylesChild({ bordered, className })}>{children}</div>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </figure>
  );
};
