import { useMode } from '@components/helpers';
import { Day, Moon } from '@components/icons';
import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

const DarkModeToggler = ({ className }: Props) => {
  const { mode, modeSwitcher } = useMode();
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={
        className ||
        'flex aspect-square h-full items-center justify-center rounded-full bg-white shadow-purple-400/10 dark:bg-slate-900/70 dark:shadow-purple-900/10'
      }
      onClick={modeSwitcher}
    >
      {mode === 'light' ? <Moon /> : <Day />}
    </motion.button>
  );
};

export default DarkModeToggler;
