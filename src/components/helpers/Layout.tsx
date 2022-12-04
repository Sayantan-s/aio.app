import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className="max-w-7xl mx-auto">{children}</div>;
};

export default Layout;
