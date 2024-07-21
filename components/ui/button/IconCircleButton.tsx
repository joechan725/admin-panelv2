import clsx from 'clsx/lite';

interface IconCircleButtonProps {
  className?: string;
  paddingClassName?: string;
  type: 'button' | 'submit' | 'reset';
  disabled: boolean;
  theme: 'danger' | 'success' | 'primary' | 'gray' | 'white' | 'signal' | 'whatsapp' | 'black';
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const IconCircleButton = ({
  className,
  paddingClassName = 'p-2',
  type,
  disabled,
  children,
  theme,
  onClick,
}: IconCircleButtonProps) => {
  return (
    <button
      className={clsx(
        'rounded-full transition-all',
        paddingClassName,
        theme === 'white' ? 'text-black' : 'text-white',
        theme === 'danger' && 'bg-danger hover:bg-danger/85 active:bg-danger/85 disabled:bg-danger/85',
        theme === 'success' && 'bg-success hover:bg-success/85 active:bg-success/70 disabled:bg-success/70',
        theme === 'primary' &&
          'bg-primary-bg  hover:bg-primary-bg/85 active:bg-primary-bg/70 disabled:bg-primary-bg/70',
        theme === 'gray' && 'bg-gray-500  hover:bg-gray-500/85 active:bg-gray-500/70 disabled:bg-gray-500/70',
        theme === 'signal' && 'bg-signal  hover:bg-signal/85 active:bg-signal/70 disabled:bg-signal/70',
        theme === 'whatsapp' && 'bg-whatsapp  hover:bg-whatsapp/85 active:bg-whatsapp/70 disabled:bg-whatsapp/70',
        theme === 'black' && 'bg-black hover:bg-black/85 active:bg-black/70 disabled:bg-black/70',
        theme === 'white' && 'bg-white hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-100',
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default IconCircleButton;
