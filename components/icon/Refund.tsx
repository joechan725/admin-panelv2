import clsx from 'clsx/lite';

interface RefundProps {
  sizeClassName?: string;
  className?: string;
}

const Refund = ({ sizeClassName = 'size-6', className }: RefundProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx(sizeClassName, className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z"
      />
    </svg>
  );
};

export default Refund;
