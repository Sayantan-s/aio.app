import { _ } from "@utils";
import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

const Pagewrap = ({ className, children }: PropsWithChildren<Props>) => {
  const styles = _.classNames(
    "absolute",
    "max-xl:max-w-4xl",
    "max-lg:max-w-3xl",
    "max-md:p-4",
    "max-w-5xl",
    "w-full",
    "top-1/2",
    "left-1/2",
    "transform",
    "-translate-y-1/2",
    "-translate-x-1/2",
    className?.split(" ") || null
  );

  return <div className={styles}>{children}</div>;
};

export default Pagewrap;
