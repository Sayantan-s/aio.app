type Order = "asc" | "desc";

interface Props {
  className?: string;
  onAscend: () => void;
  onDescend: () => void;
  order: Order | null;
}

const SortButtons = ({ className, onAscend, onDescend, order }: Props) => {
  const styles = [
    `flex`,
    "flex-col",
    ...(className ? className.split(" ") : []),
  ].join(" ");

  return (
    <div className={styles}>
      <button onClick={onAscend} disabled={order === "asc"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={8}
          height={8}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            className={
              order === "asc"
                ? "stroke-slate-300 dark:stroke-slate-700"
                : "stroke-slate-500"
            }
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={2.5}
            d="M19.92 15.05L13.4 8.53c-.77-.77-2.03-.77-2.8 0l-6.52 6.52"
          />
        </svg>
      </button>
      <button onClick={onDescend} disabled={order === "desc"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={8}
          height={8}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            className={
              order === "desc"
                ? "stroke-slate-300 dark:stroke-slate-700"
                : "stroke-slate-500"
            }
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={2.5}
            d="M19.92 8.95l-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
          />
        </svg>
      </button>
    </div>
  );
};

export default SortButtons;
