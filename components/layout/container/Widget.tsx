import clsx from 'clsx/lite';

interface WidgetProps {
  children?: React.ReactNode;
  className?: string;
  sizeFull?: boolean;
  minContentWidth?: boolean;
}

const Widget = ({ children, sizeFull, className, minContentWidth = true }: WidgetProps) => {
  return (
    <div
      className={clsx(
        'rounded-lg bg-white p-6 border border-slate-500/10 shadow-sm',
        minContentWidth && 'min-w-min',
        sizeFull && 'size-full',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Widget;
