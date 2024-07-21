import clsx from 'clsx/lite';
import Spin from '../icon/Spin';

interface LoadingSpinProps {
  sizeClassName?: string;
  theme: 'danger' | 'success' | 'gray' | 'secondary' | 'white' | 'primary' | 'black' | 'safe';
  layout: 'local' | 'global' | 'line';
}

const LoadingSpin = ({ sizeClassName = 'size-20', theme, layout }: LoadingSpinProps) => {
  return (
    <div
      className={clsx(
        'flex',
        layout === 'global' && 'w-full min-h-svh justify-center items-center',
        layout === 'line' && 'w-full justify-center'
      )}
    >
      <Spin
        className={clsx(
          'animate-spin',
          theme === 'black' && 'text-black',
          theme === 'danger' && 'text-danger',
          theme === 'success' && 'text-success',
          theme === 'gray' && 'text-gray-400',
          theme === 'secondary' && 'text-secondary-bg',
          theme === 'white' && 'text-white',
          theme === 'primary' && 'text-primary-bg',
          theme === 'safe' && 'text-safe'
        )}
        sizeClassName={sizeClassName}
      />
    </div>
  );
};

export default LoadingSpin;
