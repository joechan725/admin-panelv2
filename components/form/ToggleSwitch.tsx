'use client';

import clsx from 'clsx/lite';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  theme: 'success' | 'safe' | 'danger';
  isToggled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}
const ToggleSwitch = ({ theme, isToggled, onToggle, disabled }: ToggleSwitchProps) => {
  const handleToggle = () => {
    if (disabled) {
      return;
    }
    onToggle();
  };

  return (
    <motion.div className="relative w-10 h-5 rounded-full bg-gray-400 overflow-hidden" onClick={handleToggle}>
      <motion.div
        className={clsx(
          'absolute inset-0 w-full',
          theme === 'success' && 'bg-success',
          theme === 'danger' && 'bg-danger',
          theme === 'safe' && 'bg-safe'
        )}
        initial={{ width: isToggled ? 'auto' : 0 }}
        animate={{ width: isToggled ? 'auto' : 0 }}
        transition={{ duration: 1.65, type: 'spring' }}
      />
      <motion.span
        className="absolute size-4 top-0.5 left-0.5 rounded-full transition-all duration-500 shadow-lg bg-white"
        initial={{ x: isToggled ? 20 : 0 }}
        animate={{ x: isToggled ? 20 : 0 }}
        transition={{ duration: 0.1, type: 'spring' }}
      />
    </motion.div>
  );
};

export default ToggleSwitch;
