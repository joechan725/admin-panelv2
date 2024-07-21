import InformationSquare from '@/components/icon/InformationSquare';
import AdminPageSearchResultItem, { NavLink } from './AdminPageSearchResultItem';
import { useTranslations } from 'next-intl';

interface AdminPageSearchResultListProps {
  navLinks: NavLink[];
}

const AdminPageSearchResultList = ({ navLinks }: AdminPageSearchResultListProps) => {
  const t = useTranslations('Admin.topBar');

  return (
    <div className="max-h-96 space-y-4 overflow-y-scroll scrollbar scrollbar-slate">
      {(!navLinks || navLinks.length === 0) && (
        <div className="flex gap-4 items-center">
          <InformationSquare sizeClassName="size-5" className="text-secondary-text/80" />
          <div className="font-medium text-secondary-text">{t('noItemsMatchSearching')}</div>
        </div>
      )}
      {navLinks &&
        navLinks.length > 0 &&
        navLinks.map((navLink) => <AdminPageSearchResultItem key={navLink.href + navLink.title} navLink={navLink} />)}
    </div>
  );
};

export default AdminPageSearchResultList;
