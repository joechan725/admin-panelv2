import clsx from 'clsx/lite';
import LoadingSpin from '../loading/LoadingSpin';

interface BarButtonProps {
  type: 'submit' | 'button' | 'reset';
  theme:
    | 'safe'
    | 'danger'
    | 'success'
    | 'black'
    | 'primary'
    | 'secondary'
    | 'gray-light'
    | 'transparent'
    | 'white'
    | 'facebook'
    | 'stripe';
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  roundedClassName?: string;
  children: React.ReactNode;
  disabled: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const BarButton = ({
  theme,
  disabled,
  children,
  type,
  fontSize = 'base',
  roundedClassName = 'rounded-md',
  onClick,
}: BarButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        'min-w-max w-full py-2 px-4 transition-all flex justify-center items-center gap-4 hover:bg-opacity-85 active:bg-opacity-70 disabled:bg-opacity-70 focus:outline-none focus:ring',
        fontSize === 'xs' && 'text-xs',
        fontSize === 'sm' && 'text-xs md:text-sm',
        fontSize === 'base' && 'text-sm md:text-base',
        fontSize === 'lg' && 'text-base md:text-lg',
        fontSize === 'xl' && 'text-base md:text-xl',
        fontSize === '2xl' && 'text-base md:text-2xl',
        theme === 'white' &&
          'text-black bg-white-500 border border-gray-900/30 ring-gray-900/20 hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-200',
        theme === 'facebook' && 'text-white bg-[#4267B2] ring-[#4267B2]/20',
        theme === 'safe' && 'text-white bg-safe ring-safe/20',
        theme === 'danger' && 'text-white bg-danger ring-danger/20',
        theme === 'success' && 'text-white bg-success ring-success/20',
        theme === 'primary' && 'text-white bg-primary-bg ring-primary-bg/20',
        theme === 'secondary' && 'text-white bg-secondary-bg ring-secondary-bg/20',
        theme === 'black' && 'text-white bg-black ring-black/20',
        theme === 'stripe' && 'text-white bg-stripe ring-stripe/20',
        roundedClassName
      )}
      onClick={onClick}
    >
      {disabled && (
        <LoadingSpin
          theme={theme === 'white' ? 'primary' : 'white'}
          layout="local"
          sizeClassName={clsx(
            fontSize === 'xs' && 'size-3',
            fontSize === 'sm' && 'size-3 md:size-3.5',
            fontSize === 'base' && 'size-3.5 md:size-4',
            fontSize === 'lg' && 'size-4 md:size-4.5',
            fontSize === 'xl' && 'size-4 md:size-5',
            fontSize === 'xl' && 'size-4 md:size-6'
          )}
        />
      )}
      {children}
    </button>
  );
};
export default BarButton;
