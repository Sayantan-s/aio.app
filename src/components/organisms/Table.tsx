import { UpArrow } from "@components/icons";
import { _ } from "@utils";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
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

const TableRoot = <TData,>({
  children,
  data,
  className,
  ...props
}: TableProps<TData>) => {
  const styles = useMemo(
    () =>
      _.classNames(
        "rounded-lg",
        "overflow-hidden",
        "shadow-purple-400/10",
        "dark:shadow-purple-900/10",
        "shadow-2xl",
        "max-md:min-w-[768px]",
        className?.split(" ") || null
      ),
    []
  );
  return (
    <TableContext.Provider value={{ data }}>
      <motion.div className={styles} {...props}>
        {children}
      </motion.div>
    </TableContext.Provider>
  );
};

const useTable = () => {
  const context = useContext(TableContext);
  if (!context) throw new Error("No context found!");
  return context;
};

const Row = ({ children, className, ...rest }: TableRowProps) => {
  const styles = useMemo(
    () =>
      _.classNames(
        `flex`,
        "py-2",
        "px-4",
        "hover:bg-white/40",
        "gap-x-4",
        "hover:dark:bg-slate-900/40",
        "overflow-hidden",
        className?.split(" ") || null
      ),
    []
  );
  return (
    <motion.div className={styles} {...rest}>
      {children}
    </motion.div>
  );
};

const Head = ({ children, className, ...rest }: TableHeadProps) => {
  const styles = useMemo(
    () =>
      _.classNames(
        `flex`,
        "p-4",
        "bg-white/70",
        "shadow-md",
        "shadow-slate-500/10",
        "gap-x-4",
        "dark:shadow-slate-900/40",
        "dark:bg-slate-900/90",
        className?.split(" ") || null
      ),
    []
  );
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

  const styles = useMemo(() => {
    const afterStyles =
      `after:w-full after:h-12 after:content[' '] after:absolute after:bottom-0 after:rounded-b-lg after:bg-gradient-to-b after:from-white/0 after:via-white/50 after:to-white/90 dark:after:from-slate-900/0 dark:after:via-slate-900/50 dark:after:to-slate-900/90`.split(
        " "
      );
    const bottomGradientStyles = afterStyles.map((key) => ({
      [key]: !hasScrolledToBottom,
    }));
    return _.classNames(
      "scrollbar-hide",
      "h-[40rem]",
      "overflow-scroll",
      "backdrop:blur-lg",
      "bg-white/50",
      "dark:bg-slate-900/60",
      ...bottomGradientStyles,
      className?.split(" ") || null
    );
  }, [hasScrolledToBottom]);

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
