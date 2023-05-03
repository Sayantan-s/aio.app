import type { FC, PropsWithChildren } from 'react';

interface Props {
  containerClassName?: string;
  className?: string;
}

const BorderedCard: FC<PropsWithChildren<Props>> = ({ children, containerClassName, className }) => {
  const containerStyles = [
    'bg-gradient-to-br from-10% via-40% to-50% dark:from-slate-800/30 via-slate-900/10 dark:to-slate-900/5 p-[1.5px] rounded-lg overflow-hidden',
    containerClassName || '',
  ].join(' ');

  const contentStyles = ['w-full h-full dark:bg-slate-900/50 rounded-lg', className || ''].join(' ');

  return (
    <div className={containerStyles}>
      <div className={contentStyles}>{children}</div>
    </div>
  );
};

export default BorderedCard;
