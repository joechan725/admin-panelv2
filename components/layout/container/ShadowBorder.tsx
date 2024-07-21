import clsx from 'clsx/lite';

interface ShadowBorderProps {
  children?: React.ReactNode;
  sizeClassName?: string;
  className?: string;
}

const ShadowBorder = ({ children, sizeClassName = 'max-w-md w-full', className = 'p-16' }: ShadowBorderProps) => {
  return (
    <div className={clsx('border ring-1 ring-slate-900/5 shadow-lg rounded-xl', sizeClassName, className)}>
      {children}
    </div>
  );
};

export default ShadowBorder;
