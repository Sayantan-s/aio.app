import { Close, SearchIcon } from "@components/icons";
import { motion } from "framer-motion";

interface Props {
  className?: string;
  onSearch: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  onSearchClear: () => void;
  placeholder?: string;
}

const Search = ({
  className,
  value,
  placeholder,
  onSearch,
  onSearchClear,
}: Props) => {
  return (
    <motion.div className={className || ""}>
      <SearchIcon size={18} className="fill-slate-400 dark:fill-slate-700" />
      <input
        type={"text"}
        className="w-full text-slate-600 bg-transparent focus:outline-none placeholder:text-slate-400/50 dark:placeholder:text-slate-400/20"
        value={value}
        placeholder={placeholder}
        onChange={onSearch}
      />
      {value ? (
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

export default Search;
