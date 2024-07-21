import clsx from 'clsx/lite';

interface ChevronDoubleLeftProps {
  sizeClassName?: string;
  className?: string;
}

const ChevronDoubleLeft = ({ sizeClassName = 'size-6', className }: ChevronDoubleLeftProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx(sizeClassName, className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
    </svg>
  );
};

export default ChevronDoubleLeft;
