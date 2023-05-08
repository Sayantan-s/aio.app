import { GradientText } from '@components/atoms';
import { motion } from 'framer-motion';
import DarkModeToggler from './DarkModeToggler';
interface Props {
  children: React.ReactNode;
}

const HeaderPanel = ({ children }: Props) => {
  const handleShowSignupModal = () => {
    ('');
  };

  return (
    <div className="flex items-stretch justify-between gap-x-2">
      {children}
      <div className="flex items-center space-x-4 ">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="h-full w-24 rounded-full bg-slate-900/50 backdrop:blur-xl"
          onTap={handleShowSignupModal}
        >
          <GradientText as={'span'}>Signup</GradientText>
        </motion.button>
        <DarkModeToggler />
      </div>
    </div>
  );
};

export default HeaderPanel;
