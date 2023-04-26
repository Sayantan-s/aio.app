import React, { FC, useMemo } from "react";

interface Props {
  itemLength: number;
  children: ((index?: number) => JSX.Element | JSX.Element[]) | JSX.Element;
  itemSpacing?: "1" | "2" | "3" | "4";
}

export const SkeletonLoad: FC<Props> = ({
  itemLength,
  children,
  itemSpacing,
}) => {
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

  if (!itemLength || itemLength === 1)
    return (
      <React.Fragment>
        {typeof children !== "function" ? children : children()}
      </React.Fragment>
    );
  return (
    <div className={`h-full w-full ${listSpacing || ""}`}>
      {new Array(itemLength)
        .fill(true)
        .map((_, index) =>
          typeof children === "function" ? children(index) : null
        )}
    </div>
  );
};
