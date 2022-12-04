import { HTMLMotionProps, motion } from "framer-motion";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

interface ContextProps<TData = unknown> {
  data: TData[];
}
interface TableProps<TData = unknown>
  extends PropsWithChildren,
    HTMLMotionProps<"div">,
    ContextProps<TData> {
  className?: string;
}

interface TableRowProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

type TableHeadProps = Omit<TableRowProps, "children"> & {
  children: JSX.Element[];
};

type TableBodyProps<TData> = Omit<TableRowProps, "children"> & {
  children: (cell: TData, id: number) => React.ReactNode;
};

type TableCellProps = TableRowProps;

const TableContext = createContext<ContextProps | null>(null);

const TableRoot = <TData,>({ children, data, ...props }: TableProps<TData>) => {
  const memoizedValues = useMemo(() => data, [data]);
  return (
    <TableContext.Provider value={{ data: memoizedValues }}>
      <motion.div {...props}>{children}</motion.div>
    </TableContext.Provider>
  );
};

const useTable = () => {
  const context = useContext(TableContext);
  if (!context) throw new Error("No context found!");
  return context;
};

const Row = ({ children, className, ...rest }: TableRowProps) => {
  const styles = [`flex`, ...(className ? className.split(" ") : [])].join(" ");
  return (
    <motion.div className={styles} {...rest}>
      {children}
    </motion.div>
  );
};

const Head = ({ children, className, ...rest }: TableHeadProps) => {
  const styles = [
    `flex`,
    "p-4",
    ...(className ? className.split(" ") : []),
  ].join(" ");

  return (
    <motion.div className={styles} {...rest}>
      {children}
    </motion.div>
  );
};

const Body = <TData,>({
  children,
  className,
  ...rest
}: TableBodyProps<TData>) => {
  const { data } = useTable();
  const styles = [
    `after:w-full after:h-12 after:content[' '] after:absolute after:bottom-0 after:rounded-b-lg  after:bg-gradient-to-b after:from-white/0 after:via-white/20 after:to-white/60`,
    ...(className ? className.split(" ") : []),
  ].join(" ");
  return (
    <motion.div className={styles} {...rest}>
      {data.map((data, id) => children(data as TData, id))}
    </motion.div>
  );
};

const Cell = ({ children, ...rest }: TableCellProps) => (
  <motion.div {...rest}>{children}</motion.div>
);

export let Table = Object.assign(TableRoot, { Head, Row, Cell, Body });
