import clsx from 'clsx/lite';

interface ChevronDoubleUpProps {
  sizeClassName?: string;
  className?: string;
}

const ChevronDoubleUp = ({ sizeClassName = 'size-6', className }: ChevronDoubleUpProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx(sizeClassName, className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
    </svg>
  );
};

export default ChevronDoubleUp;
