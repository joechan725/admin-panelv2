import Radio from '@/components/form/Radio';
import { removeExtraSpaces } from '@/lib/helpers/string/removeExtraSpaces';
import clsx from 'clsx/lite';
import { Link } from '@/navigation';
import { usePathname } from 'next/navigation';

interface AdminNavNestedItemProps {
  nestedNavLink: {
    href: string;
    title: string;
  };
}

const AdminNavNestedItem = ({ nestedNavLink }: AdminNavNestedItemProps) => {
  const path = usePathname();
  let { href, title } = nestedNavLink;

  if (!href.startsWith('/')) {
    href = '/' + href;
  }
  const isSelected = path === href;
  title = removeExtraSpaces(title);
  return (
    <Link href={href}>
      <div className="flex items-center gap-6 py-2 px-4 hover:bg-white/5 active:bg-white/10 group">
        <Radio isSelected={isSelected} unselectedTheme="white" selectedTheme="secondary" />
        <div className={clsx('text-white/80', isSelected && 'font-medium')}>{title}</div>
      </div>
    </Link>
  );
};
export default AdminNavNestedItem;
