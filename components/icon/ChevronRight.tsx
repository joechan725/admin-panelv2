import clsx from 'clsx/lite';

interface ChevronRightProps {
  sizeClassName?: string;
  className?: string;
}

const ChevronRight = ({ sizeClassName = 'size-6', className }: ChevronRightProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx(sizeClassName, className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
};

export default ChevronRight;
