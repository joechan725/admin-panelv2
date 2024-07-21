import SubSideBarNavItemList from '@/components/layout/subSidebar/SubSideBarNavItemList';
import { getMyAccountNavLinks } from './getMyAccountNavLinks';
import MyAccountNavToAdminPage from './MyAccountNavToAdminPage';
import { useTranslations } from 'next-intl';

interface MyAccountSideBarProps {}

const MyAccountSideBar = ({}: MyAccountSideBarProps) => {
  const t = useTranslations('MyAccount.sideBar');

  return (
    <div className="flex flex-col gap-0.5">
      <SubSideBarNavItemList subNavLinks={getMyAccountNavLinks(t)} />
      <MyAccountNavToAdminPage />
    </div>
  );
};

export default MyAccountSideBar;
