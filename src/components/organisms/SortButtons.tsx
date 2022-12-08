import { DownArrow, UpArrow } from "@components/icons";
import { _ } from "@utils";
import { useMemo } from "react";

type Order = "asc" | "desc";

interface Props {
  className?: string;
  onAscend: () => void;
  onDescend: () => void;
  order: Order | null;
}

const SortButtons = ({ className, onAscend, onDescend, order }: Props) => {
  const styles = useMemo(
    () => _.classNames(`flex`, "flex-col", className?.split(" ") || null),
    []
  );

  return (
    <div className={styles}>
      <button onClick={onDescend} disabled={order === "desc"}>
        <UpArrow
          size={8}
          className={
            order === "desc"
              ? "stroke-slate-300 dark:stroke-slate-700"
              : "stroke-slate-500 dark:stroke-slate-600"
          }
        />
      </button>
      <button onClick={onAscend} disabled={order === "asc"}>
        <DownArrow
          className={
            order === "asc"
              ? "stroke-slate-300 dark:stroke-slate-700"
              : "stroke-slate-500 dark:stroke-slate-600"
          }
          size={8}
        />
      </button>
    </div>
  );
};

export default SortButtons;
