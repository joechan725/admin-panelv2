'use client';

import UserPlus from '@/components/icon/UserPlus';
import SubSideBarNavItemList from '@/components/layout/subSidebar/SubSideBarNavItemList';
import { useSessionStore } from '@/stores/useSessionStore';
import { useTranslations } from 'next-intl';

interface MyAccountNavToAdminPageProps {}

const MyAccountNavToAdminPage = ({}: MyAccountNavToAdminPageProps) => {
  const t = useTranslations('MyAccount.sideBar');

  const { isAdmin } = useSessionStore((state) => ({ isAdmin: state.isAdmin }));

  return (
    isAdmin && (
      <SubSideBarNavItemList
        subNavLinks={[{ href: '/admin', title: t('adminPenal'), icon: <UserPlus sizeClassName="size-4" /> }]}
      />
    )
  );
};

export default MyAccountNavToAdminPage;
