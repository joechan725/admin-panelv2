import clsx from 'clsx/lite';

interface IconButtonProps {
  className?: string;
  type: 'button' | 'submit' | 'reset';
  disabled: boolean;
  theme: 'danger' | 'success' | 'secondary' | 'primary' | 'gray' | 'white';
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const IconButton = ({ type, disabled, className, children, theme, onClick }: IconButtonProps) => {
  return (
    <button
      className={clsx(
        'text-primary-text transition-all block',
        theme === 'danger' && 'hover:text-danger active:text-danger/70 disabled:active:text-danger/70',
        theme === 'success' && 'hover:text-success active:text-success/70 disabled:text-success/70',
        theme === 'primary' && 'hover:text-primary-bg active:text-primary-bg/70 disabled:text-primary-bg/70',
        theme === 'secondary' && 'hover:text-secondary-bg active:text-secondary-bg/70 disabled:text-secondary-bg/70',
        theme === 'gray' && 'bg-gray-500  hover:bg-gray-500/85 active:bg-gray-500/70 disabled:bg-gray-500/70',
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

export default IconButton;
