import clsx from 'clsx/lite';

interface MinusProps {
  sizeClassName?: string;
  className?: string;
}

const Minus = ({ sizeClassName = 'size-6', className }: MinusProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx(sizeClassName, className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
};

export default Minus;
