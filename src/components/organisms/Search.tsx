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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
      >
        <path
          d="M11.5 21.75c-5.65 0-10.25-4.6-10.25-10.25S5.85 1.25 11.5 1.25s10.25 4.6 10.25 10.25-4.6 10.25-10.25 10.25Zm0-19c-4.83 0-8.75 3.93-8.75 8.75s3.92 8.75 8.75 8.75 8.75-3.93 8.75-8.75-3.92-8.75-8.75-8.75ZM22 22.751c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22Z"
          className="fill-slate-400"
        />
      </svg>
      <input
        type={"text"}
        className="w-full text-slate-600 bg-transparent focus:outline-none placeholder:text-slate-400/50"
        value={value}
        placeholder={placeholder}
        onChange={onSearch}
      />
      {value ? (
        <button onClick={onSearchClear}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            className="transform rotate-45"
          >
            <path
              d="M6 12h12M12 18V6"
              className="stroke-slate-400/80"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : null}
    </motion.div>
  );
};

export default Search;
