import clsx from 'clsx/lite';

interface RadioHollowProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isSelected: boolean;
  theme: 'primary';
  onSelected?: () => void;
}

const RadioHollow = ({ size, isSelected, theme, onSelected }: RadioHollowProps) => {
  return (
    <div
      className={clsx(
        'rounded-full border border-black/30 flex justify-center items-center',
        size === 'xs' && 'size-3.5',
        size === 'sm' && 'size-4',
        size === 'md' && 'size-[18px]',
        size === 'lg' && 'size-5',
        size === 'xl' && 'size-[22px]',
        theme === 'primary' && isSelected ? 'bg-primary-bg' : 'group-hover:bg-primary-bg'
      )}
      onClick={onSelected ? () => onSelected() : undefined}
    >
      <div
        className={clsx(
          'rounded-full bg-white',
          size === 'xs' && isSelected && 'size-[7px]',
          size === 'xs' && !isSelected && 'group-hover:size-[9px]',
          size === 'sm' && isSelected && 'size-2',
          size === 'sm' && !isSelected && 'group-hover:size-2.5',
          size === 'md' && isSelected && 'size-[9px]',
          size === 'md' && !isSelected && 'group-hover:size-[11px]',
          size === 'lg' && isSelected && 'size-2.5',
          size === 'lg' && !isSelected && 'group-hover:size-3',
          size === 'xl' && isSelected && 'size-[11px]',
          size === 'xl' && !isSelected && 'group-hover:size-3.5'
        )}
      />
    </div>
  );
};

export default RadioHollow;
