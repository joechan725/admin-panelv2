'use client';

import clsx from 'clsx/lite';
import { motion, AnimatePresence } from 'framer-motion';
import { Toast } from 'react-hot-toast';

interface CustomToastProps {
  t: Toast;
  children: React.ReactNode;
  sizeClassName: string;
  homePosition: 'top' | 'bottom';
  onClick?: () => void;
}

const CustomToast = ({
  t,
  children,
  sizeClassName = 'max-w-lg w-full sm:min-w-min',
  homePosition,
  onClick,
}: CustomToastProps) => {
  const originalY = homePosition === 'bottom' ? 60 : homePosition === 'top' ? -60 : undefined;

  return (
    <AnimatePresence>
      {t.visible && (
        <motion.div
          onClick={onClick}
          initial={{ opacity: 0, scale: 0.7, y: originalY }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: originalY }}
          transition={{ duration: 0.3 }}
          className={clsx(
            'bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5',
            sizeClassName
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomToast;
