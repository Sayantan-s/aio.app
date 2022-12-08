import { UpArrow } from "@components/icons";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";

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
  children: ((cell: TData, id: number) => React.ReactNode) | React.ReactNode;
};

type TableCellProps = Partial<TableRowProps>;

const TableContext = createContext<ContextProps | null>(null);

const TableRoot = <TData,>({ children, data, ...props }: TableProps<TData>) => {
  return (
    <TableContext.Provider value={{ data }}>
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
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const tableBodyRef = useRef<HTMLDivElement>(null);

  const styles = [
    !hasScrolledToBottom
      ? `after:w-full after:h-12 after:content[' '] after:absolute after:bottom-0 after:rounded-b-lg after:bg-gradient-to-b after:from-white/0 after:via-white/20 after:to-white/70 dark:after:from-slate-900/0 dark:after:via-slate-900/20 dark:after:to-slate-900/70`
      : "",
    "scrollbar-hide",
    ...(className ? className.split(" ") : []),
  ].join(" ");

  const handleTableBodyScroll: React.UIEventHandler<HTMLDivElement> = (eve) => {
    const { scrollHeight, clientHeight, scrollTop } = eve.currentTarget;
    setHasScrolledToBottom(!(scrollHeight - (clientHeight + scrollTop)));
  };

  const onScrollToTop = () =>
    tableBodyRef.current?.scrollTo({ behavior: "smooth", top: 0 });

  return (
    <motion.div
      className={styles}
      {...rest}
      onScroll={handleTableBodyScroll}
      ref={tableBodyRef}
    >
      {typeof children === "function"
        ? data.map((data, id) => children(data as TData, id))
        : children}
      <AnimatePresence>
        {hasScrolledToBottom && (
          <motion.button
            onClick={onScrollToTop}
            whileTap={{ scale: 0.9 }}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            className="fixed bg-white shadow-sm shadow-slate-300/50 rounded-full bottom-6 right-6 w-8 h-8 flex justify-center items-center dark:bg-slate-900 dark:shadow-none dark:border-2 dark:border-slate-800/50"
          >
            <UpArrow
              size={18}
              className="stroke-slate-700 dark:stroke-slate-600/60"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Cell = ({ children, ...rest }: TableCellProps) => (
  <motion.div {...rest}>{children}</motion.div>
);

export let Table = Object.assign(TableRoot, { Head, Row, Cell, Body });
