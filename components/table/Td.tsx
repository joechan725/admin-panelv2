import clsx from 'clsx/lite';

interface TdProps {
  children: React.ReactNode;
  className?: string;
}

const Td = ({ children, className }: TdProps) => {
  return <td className={clsx('p-2', className)}>{children}</td>;
};

export default Td;
