'use client';

import clsx from 'clsx/lite';
import { AnimatePresence, motion } from 'framer-motion';

interface BadgeCountProps {
  badgeCount?: number;
  maxBadgeCount: number;
  sizeClassName?: string;
  fontSizeClassName?: string;
}

const BadgeCount = ({
  badgeCount = 0,
  maxBadgeCount,
  sizeClassName = 'size-6',
  fontSizeClassName = 'text-xs',
}: BadgeCountProps) => {
  return (
    <AnimatePresence>
      {badgeCount > 0 && (
        <motion.div
          className={clsx('bg-red-500 rounded-full flex justify-center items-center', sizeClassName)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <div className={clsx('text-white font-medium', fontSizeClassName)}>
            {badgeCount > maxBadgeCount ? `${maxBadgeCount}+` : badgeCount}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BadgeCount;
