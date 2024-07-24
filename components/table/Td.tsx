import clsx from 'clsx/lite';

interface TdProps {
  children: React.ReactNode;
  className?: string;
  hidden?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const Td = ({ children, className, hidden }: TdProps) => {
  return (
    <td
      className={clsx(
        'p-2',
        className,
        hidden === 'sm' && 'hidden sm:table-cell',
        hidden === 'md' && 'hidden md:table-cell',
        hidden === 'lg' && 'hidden lg:table-cell',
        hidden === 'xl' && 'hidden xl:table-cell',
        hidden === '2xl' && 'hidden 2xl:table-cell'
      )}
    >
      {children}
    </td>
  );
};

export default Td;
