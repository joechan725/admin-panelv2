import clsx from 'clsx/lite';

interface RadioProps {
  isSelected: boolean;
  unselectedTheme: 'white' | 'gray' | 'black';
  selectedTheme: 'secondary';
  onSelected?: () => void;
}

const Radio = ({ isSelected, unselectedTheme, selectedTheme, onSelected }: RadioProps) => {
  return (
    <div
      onClick={onSelected}
      className={clsx(
        'rounded-full size-1.5 mx-1.5 min-w-1.5 min-h-1.5',
        !isSelected &&
          unselectedTheme === 'white' &&
          'bg-white/80 group-hover:ring-4 group-hover:ring-white/20 group-active:ring-4 group-active:ring-white/40',
        !isSelected &&
          unselectedTheme === 'gray' &&
          'bg-gray-500/80 group-hover:ring-4 group-hover:ring-gray-500/20 group-active:ring-4 group-active:ring-gray-500/40',
        !isSelected &&
          unselectedTheme === 'black' &&
          'bg-black/80 group-hover:ring-4 group-hover:ring-black/20 group-active:ring-4 group-active:ring-black/40',
        isSelected && selectedTheme === 'secondary' && 'bg-secondary-bg ring-4 ring-secondary-bg/20'
      )}
    />
  );
};

export default Radio;
