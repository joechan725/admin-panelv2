import ChevronRight from '@/components/icon/ChevronRight';
import Link from 'next/link';

export interface NavLink {
  title: string;
  href: string;
  icon?: React.ReactNode;
  ending?: React.ReactNode;
}

interface AdminPageSearchResultItemProps {
  navLink: NavLink;
}

const AdminPageSearchResultItem = ({ navLink }: AdminPageSearchResultItemProps) => {
  const { href, title, ending, icon } = navLink;

  return (
    <Link href={href} className="block">
      <div className="flex gap-2 items-center justify-between rounded-md">
        <div className="flex-1 flex items-center justify-start gap-4 group">
          <div className="rounded-full text-secondary-text/80 group-hover:text-opacity-85 group-active:text-opacity-70">
            {icon}
            {!icon && <ChevronRight sizeClassName="size-5" />}
          </div>
          <div className="font-medium text-secondary-text group-hover:text-opacity-85 group-active:text-opacity-70">
            {title}
          </div>
        </div>
        {ending && <div className="flex-0">{ending}</div>}
      </div>
    </Link>
  );
};

export default AdminPageSearchResultItem;
