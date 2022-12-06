import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className, ...rest }: Props) => {
  const styles = [
    `mx-auto`,
    "h-screen",
    "overflow-hidden",
    ...(className ? className.split(" ") : []),
  ].join(" ");

  return (
    <div className={styles} {...rest}>
      {children}
    </div>
  );
};
