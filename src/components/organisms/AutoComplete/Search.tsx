import { Close, SearchIcon } from '@components/icons';
import { motion } from 'framer-motion';
import { memo } from 'react';
import BorderedCard from '../BorderedCard';

interface Props {
  onSearch: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  onSearchClear: () => void;
  placeholder?: string;
}

const Search = ({ value, placeholder, onSearch, onSearchClear }: Props) => {
  return (
    <BorderedCard
      containerClassName="flex-1 max-w-xs max-lg:max-w-full max-lg:w-full"
      className="flex justify-center p-2"
    >
      <motion.div className={'flex w-full items-center gap-x-2 rounded-md backdrop:blur-lg'}>
        <SearchIcon size={18} className="fill-slate-400 dark:fill-slate-700" />
        <input
          type={'text'}
          className="w-full bg-transparent text-slate-600 placeholder:text-slate-400/50 focus:outline-none dark:placeholder:text-slate-400/20"
          value={value}
          placeholder={placeholder}
          onChange={onSearch}
        />
        {value.trim() ? (
          <button onClick={onSearchClear}>
            <Close size={20} className="stroke-slate-400/80 dark:stroke-slate-400/20" />
          </button>
        ) : null}
      </motion.div>
    </BorderedCard>
  );
};

export default memo(Search);
