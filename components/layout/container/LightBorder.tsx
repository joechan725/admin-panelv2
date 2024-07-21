import clsx from 'clsx/lite';

interface LightBorderProps {
  children?: React.ReactNode;
  className?: string;
}

const LightBorder = ({ children, className = 'px-4 py-6' }: LightBorderProps) => {
  return <div className={clsx('border border-slate-600/20 rounded-md', className)}>{children}</div>;
};

export default LightBorder;
