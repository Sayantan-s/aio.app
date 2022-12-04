import { HTMLMotionProps, motion } from "framer-motion";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

interface TableProps<TData = unknown> extends PropsWithChildren {
  headings: string[];
  data: TData[];
}

interface TableRowProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

type TableHeadProps = Omit<TableRowProps, "children"> & {
  children: (cell: string) => React.ReactNode;
};

type TableBodyProps<TData> = Omit<TableRowProps, "children"> & {
  children: (cell: TData, id: number) => React.ReactNode;
};

type TableCellProps = TableRowProps;

const TableContext = createContext<TableProps | null>(null);

const TableRoot = <TData,>({ children, ...props }: TableProps<TData>) => {
  const memoizedValues = useMemo(() => props, [props]);
  return (
    <TableContext.Provider value={memoizedValues}>
      {children}
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

const Head = ({ children, ...rest }: TableHeadProps) => {
  const { headings } = useTable();
  return (
    <motion.div {...rest}>
      <Table.Row>{headings.map((heading) => children(heading))}</Table.Row>
    </motion.div>
  );
};

const Body = <TData,>({ children, ...rest }: TableBodyProps<TData>) => {
  const { data } = useTable();
  return (
    <motion.div {...rest}>
      {data.map((data, id) => children(data as TData, id))}
    </motion.div>
  );
};

const Cell = ({ children, ...rest }: TableCellProps) => (
  <motion.div {...rest}>{children}</motion.div>
);

export let Table = Object.assign(TableRoot, { Head, Row, Cell, Body });
