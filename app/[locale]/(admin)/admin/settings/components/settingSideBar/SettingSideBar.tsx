import SubSideBarNavItemList from '@/components/layout/subSidebar/SubSideBarNavItemList';
import { getSettingNavItems } from './getSettingNavItemLinks';
import { useTranslations } from 'next-intl';

interface SettingSideBarProps {}
const SettingSideBar = ({}: SettingSideBarProps) => {
  const t = useTranslations('Admin.setting');

  return (
    <div className="mt-4">
      <SubSideBarNavItemList subNavLinks={getSettingNavItems(t)} />
    </div>
  );
};
export default SettingSideBar;
