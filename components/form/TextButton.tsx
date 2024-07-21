import clsx from 'clsx/lite';
import LoadingSpin from '../loading/LoadingSpin';

interface TextButtonProps {
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  theme: 'danger' | 'safe' | 'black' | 'secondary' | 'primary';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const TextButton = ({ type, children, disabled = false, theme, className, onClick }: TextButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        'flex items-center gap-2 font-semibold transition-all',
        theme === 'danger' && 'text-danger hover:text-danger/85 active:text-danger/70 disabled:text-danger/70',
        theme === 'safe' && 'text-safe hover:text-safe/85 active:text-safe/70 disabled:text-safe/70',
        theme === 'black' && 'text-black hover:text-black/75 active:text-black/50 disabled:text-black/50',
        theme === 'secondary' &&
          'text-secondary hover:text-secondary/85 active:text-secondary/70 disabled:text-secondary/70',
        theme === 'primary' &&
          'text-primary-text hover:text-primary-text/85 active:text-primary-text/70 disabled:text-primary-text/70',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {disabled && <LoadingSpin theme={theme} layout="local" sizeClassName="size-4" />}
      {children}
    </button>
  );
};

export default TextButton;
