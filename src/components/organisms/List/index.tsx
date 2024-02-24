import { useMemo, useState } from 'react';

interface Props<TData> {
  data?: TData[];
  children: (item: TData, index: number) => JSX.Element | JSX.Element[] | null;
  renderHeader?: (hasScrolledFromTop: boolean) => JSX.Element | JSX.Element[];
  itemSpacing?: '1' | '2' | '3' | '4';
  isLoading?: boolean;
  renderFallback?: () => JSX.Element | JSX.Element[];
  error?: string | undefined;
  className?: string;
}

export const List = <TData,>({
  data,
  children,
  renderHeader,
  itemSpacing,
  className,
  renderFallback,
  isLoading,
}: Props<TData>) => {
  const [hasScrolledFromTop, setHasScrolledFromTop] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const onHandleScroll: React.UIEventHandler<HTMLDivElement> = (eve) => {
    const target = eve.target as HTMLDivElement;
    setHasScrolledFromTop(target.scrollTop > 0);
    setHasScrolledToBottom(target.scrollHeight - (target.scrollTop + target.clientHeight) < 5);
  };

  const listSpacing = useMemo(() => {
    if (itemSpacing) {
      switch (itemSpacing) {
        case '1':
        default:
          return `space-y-1`;
        case '2':
          return `space-y-2`;
        case '3':
          return `space-y-3`;
        case '4':
          return `space-y-4`;
      }
    }
  }, [itemSpacing]);

  return (
    <div
      className={`flex flex-1 flex-col overflow-hidden rounded-lg dark:bg-slate-900/50 ${
        className || ''
      }`}
    >
      <div className="relative flex h-full flex-col">
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-1 flex-col overflow-hidden">
          <div
            className="scrollbar-hide news flex flex-col space-y-3 overflow-y-auto pb-4"
            onScroll={onHandleScroll}
          >
            {renderHeader ? (
              <header className={`sticky top-0 z-20 w-full shadow-xl`}>
                {renderHeader(hasScrolledFromTop)}
              </header>
            ) : null}
            <div role="list" {...(listSpacing ? { className: listSpacing } : {})}>
              {isLoading ? renderFallback?.() : data?.map((list, index) => children(list, index))}
            </div>
          </div>
          {!hasScrolledToBottom ? (
            <div className="absolute bottom-0 z-50 h-10 w-full bg-gradient-to-b from-slate-900/0 via-slate-900/50 to-slate-900"></div>
          ) : null}{' '}
        </div>
      </div>
    </div>
  );
};
