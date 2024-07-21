'use client';

import { useParams } from 'next/navigation';
import { getUserNavLinks } from './getUserNavLinks';
import SubSideBarNavItemList from '@/components/layout/subSidebar/SubSideBarNavItemList';
import { useTranslations } from 'next-intl';

interface UserSidebarProps {}

const UserSidebar = ({}: UserSidebarProps) => {
  const t = useTranslations('MyAccount.sideBar');

  const params = useParams();

  const userId = params.userId;

  if (typeof userId !== 'string') {
    return;
  }

  const userNavLinks = getUserNavLinks(userId, t);

  return <SubSideBarNavItemList subNavLinks={userNavLinks} />;
};

export default UserSidebar;
