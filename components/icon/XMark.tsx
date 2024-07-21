import clsx from 'clsx/lite';

interface XMarkProps {
  sizeClassName?: string;
  className?: string;
}

const XMark = ({ sizeClassName = 'size-6', className }: XMarkProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx('bi bi-youtube', sizeClassName, className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
};

export default XMark;
