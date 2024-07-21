'use client';

import clsx from 'clsx/lite';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import IconButton from '../button/IconButton';
import XMark from '@/components/icon/XMark';

interface PopUpLeftBarProps {
  children: React.ReactNode;
  scrollbar?: boolean;
  sizeClassName: string;
  roundedClassName?: string;
  backgroundColorClassName?: string;
  className?: string;
  ring?: 'slate' | 'stone' | 'sky' | 'gray';
  backdrop: boolean;
  onClose: () => void;
  closeButton?: boolean;
}

const PopUpLeftBar = ({
  children,
  scrollbar,
  roundedClassName = 'rounded-r-lg',
  sizeClassName = 'size-full max-w-lg',
  backgroundColorClassName = 'bg-white',
  className,
  ring = 'slate',
  backdrop = true,
  onClose,
  closeButton = false,
}: PopUpLeftBarProps) => {
  const [isSSR, setIsSSR] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.onclick = onClose;
      }
      if (typeof document === 'undefined') {
        return;
      }
      document.addEventListener('keydown', handleKeyDown);
    }, 350);
    return () => {
      clearTimeout(timer);
      if (typeof document === 'undefined') {
        return;
      }
      document.removeEventListener('keypress', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    return null;
  }

  if (typeof document === 'undefined') {
    return null;
  }

  const body = document.querySelector('body');

  if (!body) {
    return null;
  }

  return createPortal(
    <div className="fixed w-screen h-screen inset-0 flex justify-start items-center z-[99]">
      {/* Backdrop */}
      <motion.div
        className={clsx('fixed w-screen h-screen inset-0 z-[99]', backdrop && 'bg-black/65')}
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Modal */}
      <motion.div
        initial={{ x: '-100%', opacity: 0.5 }}
        animate={{ x: '0%', opacity: 1 }}
        exit={{ x: '-100%', opacity: 0.5 }}
        transition={{ duration: 0.3 }}
        className={clsx(
          'ring-1 shadow-xl z-[100]',
          scrollbar && 'overflow-y-auto scrollbar',
          backgroundColorClassName,
          ring === 'slate' && 'ring-slate-900/5',
          ring === 'gray' && 'ring-gray-900/5',
          ring === 'stone' && 'ring-gray-900/5',
          ring === 'sky' && 'ring-sky-900/5',
          roundedClassName,
          sizeClassName,
          className
        )}
      >
        {closeButton && (
          <IconButton
            disabled={false}
            theme="danger"
            type="button"
            className="group absolute right-3 top-3 z-[101]"
            onClick={() => onClose()}
          >
            <XMark
              sizeClassName="size-6"
              className="text-red-600 group-hover:text-opacity-85 group-active:text-opacity-70"
            />
          </IconButton>
        )}
        {children}
      </motion.div>
    </div>,
    body
  );
};

export default PopUpLeftBar;
