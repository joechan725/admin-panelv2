'use client';

import XMark from '@/components/icon/XMark';
import clsx from 'clsx/lite';
import { useEffect } from 'react';

interface DropDownProps {
  children: React.ReactNode;
  sizeClassName: string;
  roundedClassName?: string;
  className?: string;
  backgroundColorClassName?: string;
  positionClassName: string;
  translateClassName?: string;
  closeButton?: boolean;
  ring?: 'slate' | 'stone' | 'sky' | 'gray';
  backdrop?: boolean;
  onClose: () => void;
  scroll?: boolean;
}

const DropDown = ({
  children,
  roundedClassName = 'rounded-lg',
  sizeClassName = 'w-96',
  className,
  ring = 'slate',
  closeButton,
  positionClassName,
  translateClassName,
  backgroundColorClassName = 'bg-white',
  backdrop,
  onClose,
  scroll = true,
}: DropDownProps) => {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
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

  return (
    <>
      {/* Backdrop */}
      <div className={clsx('fixed w-screen h-screen inset-0 z-[99]', backdrop && 'bg-black/65')} onClick={onClose} />
      {/* DropDown */}
      <div
        className={clsx(
          'absolute translate-y-full ring-1 shadow-xl z-[100]',
          scroll && 'overflow-y-auto scrollbar scrollbar-slate',
          backgroundColorClassName,
          ring === 'slate' && 'ring-slate-900/5',
          ring === 'gray' && 'ring-gray-900/5',
          ring === 'stone' && 'ring-gray-900/5',
          ring === 'sky' && 'ring-sky-900/5',
          positionClassName,
          translateClassName,
          roundedClassName,
          sizeClassName,
          className
        )}
      >
        {closeButton && (
          <button className="group absolute right-3 top-3 z-[101]" onClick={() => onClose()}>
            <XMark
              sizeClassName="size-6"
              className="text-red-600 group-hover:text-opacity-85 group-active:text-opacity-70"
            />
          </button>
        )}
        {children}
      </div>
    </>
  );
};

export default DropDown;
