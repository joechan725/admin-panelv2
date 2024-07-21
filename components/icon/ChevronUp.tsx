import clsx from 'clsx/lite';

interface ChevronUpProps {
  sizeClassName?: string;
  className?: string;
}

const ChevronUp = ({ sizeClassName = 'size-6', className }: ChevronUpProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx(sizeClassName, className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  );
};

export default ChevronUp;
