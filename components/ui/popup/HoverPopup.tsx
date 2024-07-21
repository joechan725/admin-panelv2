import clsx from 'clsx';

interface HoverPopupProps {
  children: React.ReactNode;
  message: React.ReactNode;
  size?: 'xs' | 'sm' | 'md';
  position?: 'top' | 'bottom';
  algin?: 'left' | 'right';
  background?: boolean;
}

const HoverPopup = ({
  children,
  message,
  size = 'sm',
  position = 'top',
  background = true,
  algin = 'left',
}: HoverPopupProps) => {
  return (
    <div className="relative flex items-center group/popup">
      {children}
      <div
        className={clsx(
          'hidden group-hover/popup:block absolute min-w-max text-white rounded-md z-[90]',
          size === 'xs' && 'text-xs',
          background && size === 'xs' && 'px-2 py-1',
          size === 'sm' && 'text-sm',
          background && size === 'sm' && 'px-2.5 py-1.5',
          size === 'md' && 'text-base',
          background && size === 'md' && 'px-3 py-2',
          position === 'top' && 'bottom-full mb-1',
          position === 'bottom' && 'top-full mt-1',
          algin === 'left' && 'left-0',
          algin === 'right' && 'right-0',
          background && 'bg-gray-800 shadow-lg'
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default HoverPopup;
