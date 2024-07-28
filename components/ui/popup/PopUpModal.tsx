'use client';

import clsx from 'clsx/lite';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import XMark from '@/components/icon/XMark';
import IconButton from '../button/IconButton';

interface PopUpModalProps {
  children: React.ReactNode;
  scrollbar?: boolean;
  sizeClassName: string;
  roundedClassName?: string;
  backgroundColorClassName?: string;
  className?: string;
  ring?: 'slate' | 'stone' | 'sky' | 'gray' | 'none';
  backdrop: boolean;
  blurBackdrop?: boolean;
  onClose: () => void;
  closeButton?: boolean;
  backdropAnimation?: boolean;
  modalAnimation?: boolean;
}

const PopUpModal = ({
  children,
  scrollbar,
  sizeClassName = 'size-96',
  roundedClassName = 'rounded-lg',
  backgroundColorClassName = 'bg-white',
  className,
  ring = 'slate',
  backdrop = true,
  blurBackdrop = false,
  backdropAnimation = true,
  modalAnimation = true,
  onClose,
  closeButton = false,
}: PopUpModalProps) => {
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
    <div className="fixed w-screen h-screen inset-0 flex justify-center items-center z-[99]">
      {/* Backdrop */}
      <motion.div
        className={clsx(
          'fixed w-screen h-screen inset-0 z-[99]',
          backdrop && blurBackdrop ? 'backdrop-blur-xl' : 'bg-black/65'
        )}
        ref={ref}
        initial={backdropAnimation ? { opacity: 0 } : undefined}
        animate={backdropAnimation ? { opacity: 1 } : undefined}
        exit={backdropAnimation ? { opacity: 0 } : undefined}
        transition={backdropAnimation ? { duration: 0.3 } : undefined}
      />
      {/* Modal */}
      <motion.div
        initial={modalAnimation ? { y: 60, opacity: 0 } : undefined}
        animate={modalAnimation ? { y: 0, opacity: 1 } : undefined}
        exit={modalAnimation ? { y: -60, opacity: 0 } : undefined}
        transition={modalAnimation ? { duration: 0.3 } : undefined}
        className={clsx(
          'z-[100]',
          scrollbar && 'overflow-y-auto scrollbar max-h-[calc(100vh-36px)]',
          backgroundColorClassName,
          ring !== 'none' && 'ring-1 shadow-xl',
          ring === 'slate' && 'ring-slate-900/5',
          ring === 'gray' && 'ring-gray-900/5',
          ring === 'stone' && 'ring-gray-900/5',
          ring === 'sky' && 'ring-sky-900/5',
          roundedClassName,
          sizeClassName,
          className,
          closeButton && 'relative'
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

export default PopUpModal;
