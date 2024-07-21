import clsx from 'clsx/lite';

interface ChevronDownProps {
  sizeClassName?: string;
  className?: string;
}

const ChevronDown = ({ sizeClassName = 'size-6', className }: ChevronDownProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx(sizeClassName, className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
};

export default ChevronDown;
