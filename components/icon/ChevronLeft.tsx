import clsx from 'clsx/lite';

interface ChevronLeftProps {
  sizeClassName?: string;
  className?: string;
}

const ChevronLeft = ({ sizeClassName = 'size-6', className }: ChevronLeftProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx(sizeClassName, className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
};

export default ChevronLeft;
