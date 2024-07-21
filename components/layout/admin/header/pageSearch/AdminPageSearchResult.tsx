'use client';

import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import { getAdminNavLinks } from '../../getAdminNavLinks';
import { NavLink } from './AdminPageSearchResultItem';
import AdminPageSearchResultList from './AdminPageSearchResultList';
import { searchObjectsByKeys } from '@/lib/helpers/objects/searchObjectsByKeys';
import DropDown from '@/components/ui/popup/DropDown';
import { useTranslations } from 'next-intl';

interface AdminPageSearchResultProps {}

const AdminPageSearchResult = ({}: AdminPageSearchResultProps) => {
  const tAdmin = useTranslations('Admin.sideBar');

  const adminNavLinks = getAdminNavLinks(tAdmin);

  const { loadRemoveSearchParams, searchParams } = useSearching();

  const handleClose = () => {
    loadRemoveSearchParams({ key: 'page-search' });
  };

  const pageSearch = searchParams.get('page-search');

  if (!pageSearch) {
    return null;
  }

  const navLinks: NavLink[] = [];

  adminNavLinks.forEach((adminNavLink) => {
    const { href, title, ending, icon, nestedNavLinks } = adminNavLink;
    navLinks.push({ href, title, ending, icon });
    if (nestedNavLinks) {
      nestedNavLinks.forEach((nestedNavLink) => {
        navLinks.push(nestedNavLink);
      });
    }
  });

  const navLinksSearchResult = searchObjectsByKeys(navLinks, ['title', 'href'], pageSearch);

  return (
    <DropDown
      backdrop
      onClose={handleClose}
      sizeClassName="w-full max-h-96"
      className="px-10 py-6"
      positionClassName="-bottom-1"
    >
      <AdminPageSearchResultList navLinks={navLinksSearchResult} />
    </DropDown>
  );
};

export default AdminPageSearchResult;
