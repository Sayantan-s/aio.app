import { _ } from "@utils";
import React, { useMemo } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className, ...rest }: Props) => {
  const styles = useMemo(
    () =>
      _.classNames(
        `mx-auto`,
        "h-screen",
        "overflow-hidden",
        className?.split(" ") || null
      ),
    []
  );

  return (
    <div className={styles} {...rest}>
      {children}
    </div>
  );
};
