import { useTranslations } from 'next-intl';
import { getAdminNavLinks } from '../getAdminNavLinks';
import AdminNavItem from './AdminNavItem';

interface AdminNavItemListProps {}

const AdminNavItemList = ({}: AdminNavItemListProps) => {
  const tAdmin = useTranslations('Admin.sideBar');

  const adminNavLinks = getAdminNavLinks(tAdmin);

  return (
    <div className="flex flex-col gap-2 pb-20 pl-5 pr-3 max-h-full overflow-y-scroll scrollbar scrollbar-slate ">
      {adminNavLinks &&
        adminNavLinks.length > 0 &&
        adminNavLinks.map((adminNavLink) => (
          <AdminNavItem key={adminNavLink.title} adminNavLink={adminNavLink}>
            <span role="button">{adminNavLink.title}</span>
          </AdminNavItem>
        ))}
    </div>
  );
};

export default AdminNavItemList;
