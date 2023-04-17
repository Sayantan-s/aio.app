import { Close, SearchIcon } from "@components/icons";
import { motion } from "framer-motion";
import { memo } from "react";

interface Props {
  onSearch: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  onSearchClear: () => void;
  placeholder?: string;
}

const Search = ({ value, placeholder, onSearch, onSearchClear }: Props) => {
  return (
    <motion.div
      className={
        "flex items-center gap-x-2 flex-1 max-w-xs max-lg:max-w-full max-lg:w-full bg-white/70 backdrop:blur-lg py-2 px-3 rounded-md shadow-purple-400/10 dark:shadow-none dark:bg-slate-900/50"
      }
    >
      <SearchIcon size={18} className="fill-slate-400 dark:fill-slate-700" />
      <input
        type={"text"}
        className="w-full text-slate-600 bg-transparent focus:outline-none placeholder:text-slate-400/50 dark:placeholder:text-slate-400/20"
        value={value}
        placeholder={placeholder}
        onChange={onSearch}
      />
      {value.trim() ? (
        <button onClick={onSearchClear}>
          <Close
            size={20}
            className="stroke-slate-400/80 dark:stroke-slate-400/20"
          />
        </button>
      ) : null}
    </motion.div>
  );
};

export default memo(Search);
