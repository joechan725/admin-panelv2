import clsx from 'clsx/lite';
import Tick from '../icon/Tick';

interface BoxTickProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isSelected: boolean;
  theme: 'primary';
  onSelected?: () => void;
}

const BoxTick = ({ size = 'sm', isSelected, theme, onSelected }: BoxTickProps) => {
  return (
    <div
      className={clsx(
        'border rounded border-black/30 flex justify-center items-center',
        size === 'xs' && 'size-3.5',
        size === 'sm' && 'size-4',
        size === 'md' && 'size-[18px]',
        size === 'lg' && 'size-5',
        size === 'xl' && 'size-[22px]',
        theme === 'primary' && isSelected ? 'bg-primary-bg' : 'group-hover:bg-primary-bg/70'
      )}
      onClick={onSelected ? () => onSelected() : undefined}
    >
      <Tick
        sizeClassName={clsx(
          size === 'xs' && 'size-3.5',
          size === 'sm' && 'size-4',
          size === 'md' && 'size-[18px]',
          size === 'lg' && 'size-5',
          size === 'xl' && 'size-[22px]'
        )}
        className={clsx('text-white font-bold', !isSelected && 'hidden group-hover:block')}
      />
    </div>
  );
};

export default BoxTick;
