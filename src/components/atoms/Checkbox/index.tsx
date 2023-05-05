import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { FC, MouseEventHandler } from 'react';

interface Props
  extends Omit<
      React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      'onClick'
    >,
    VariantProps<typeof styles> {
  checked: boolean;
  onCheck: MouseEventHandler<HTMLDivElement>;
}

const styles = cva(
  `flex aspect-square w-5 cursor-pointer items-center justify-center rounded-full border`,
  {
    variants: {
      checked: {
        true: 'bg-emerald-600 border-transparent',
        false: 'bg-slate-600/5 border-slate-100/5 hover:bg-slate-600/10 hover:border-slate-100/10',
      },
    },
    defaultVariants: {
      checked: false,
    },
  },
);

export const Checkbox: FC<Props> = ({ checked, onCheck, ...rest }) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = (eve) => {
    eve.stopPropagation();
    onCheck?.(eve);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (eve) => eve.stopPropagation();

  return (
    <div
      onKeyDown={handleKeyDown}
      {...rest}
      className={styles({ checked })}
      onClick={handleClick}
      role="checkbox"
      tabIndex={0}
      aria-checked={checked}
    >
      {checked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
        >
          <path
            d="M20.5762 7.48016C20.8414 7.16195 20.7984 6.68903 20.4802 6.42385C20.1619 6.15868 19.689 6.20167 19.4239 6.51988L14.0332 12.9887C12.9503 14.2881 12.1886 15.1994 11.5279 15.796C10.8826 16.3787 10.4373 16.5639 10 16.5639C9.56276 16.5639 9.11742 16.3787 8.47213 15.796C7.81143 15.1994 7.04969 14.2881 5.96686 12.9887L4.57618 11.3199C4.31101 11.0017 3.83809 10.9587 3.51988 11.2239C3.20167 11.489 3.15868 11.9619 3.42385 12.2802L4.85312 13.9953C5.88839 15.2376 6.71748 16.2326 7.46684 16.9092C8.24089 17.6082 9.03216 18.0639 10 18.0639C10.9679 18.0639 11.7591 17.6082 12.5332 16.9092C13.2826 16.2326 14.1116 15.2377 15.1469 13.9953L20.5762 7.48016Z"
            className="fill-emerald-50"
          />
        </svg>
      ) : null}
    </div>
  );
};
