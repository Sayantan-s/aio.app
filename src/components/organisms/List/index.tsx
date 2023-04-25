import { useMemo, useState } from "react";

interface Props<TData> {
  data: TData[];
  children: (item: TData) => JSX.Element | JSX.Element[] | null;
  renderHeader?: () => JSX.Element | JSX.Element[];
  itemSpacing?: "1" | "2" | "3" | "4";
  isLoading?: boolean;
  error?: string | undefined;
  className?: string;
}

export const List = <TData,>({
  data,
  children,
  renderHeader,
  itemSpacing,
  className,
}: Props<TData>) => {
  const [transformUI, setTransformUI] = useState(false);

  const onHandleScroll: React.UIEventHandler<HTMLDivElement> = (eve) => {
    const target = eve.target as HTMLDivElement;
    setTransformUI(target.scrollTop > 0);
  };

  const listSpacing = useMemo(() => {
    if (itemSpacing) {
      switch (itemSpacing) {
        case "1":
        default:
          return `space-y-1`;
        case "2":
          return `space-y-2`;
        case "3":
          return `space-y-3`;
        case "4":
          return `space-y-4`;
      }
    }
  }, [itemSpacing]);

  return (
    <div
      className={`dark:bg-slate-900/50 rounded-lg flex-1 overflow-hidden flex flex-col ${
        className || ""
      }`}
    >
      <div className="relative flex flex-col h-full">
        <div className="flex-1 absolute top-0 left-0 right-0 bottom-0 overflow-hidden flex flex-col">
          <div
            className="flex flex-col space-y-3 overflow-y-auto scrollbar-hide news pb-4"
            onScroll={onHandleScroll}
          >
            {renderHeader ? (
              <header className="sticky top-0 w-full z-20">
                {renderHeader()}
              </header>
            ) : null}
            <div
              role="list"
              {...(listSpacing ? { className: listSpacing } : {})}
            >
              {data?.map((list) => children(list))}
            </div>
          </div>
          <div className="h-10 w-full bg-gradient-to-b from-slate-900/0 via-slate-900/50 to-slate-900 absolute bottom-0 z-50" />
        </div>
      </div>
    </div>
  );
};
