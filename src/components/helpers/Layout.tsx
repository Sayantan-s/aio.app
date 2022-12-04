import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: Props) => {
  const styles = [
    `mx-auto`,
    "h-screen",
    "overflow-hidden",
    ...(className ? className.split(" ") : []),
  ].join(" ");

  return <div className={styles}>{children}</div>;
};

export default Layout;
