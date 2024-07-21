import clsx from 'clsx/lite';

interface TrBodyProps {
  children: React.ReactNode;
  onClick?: () => void;
}
const TrBody = ({ children, onClick }: TrBodyProps) => {
  return (
    <tr
      className={clsx('border-b border-slate-900/10 even:bg-gray-50/50', onClick && 'hover:cursor-pointer')}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};
export default TrBody;
