'use client';

import AdjustmentHorizontal from '@/components/icon/AdjustmentHorizontal';
import Login from '@/components/icon/Login';
import Logout from '@/components/icon/Logout';
import StoreFront from '@/components/icon/StoreFront';
import User from '@/components/icon/User';
import AvatarShow from '@/components/ui/image/AvatarShow';
import DropDown from '@/components/ui/popup/DropDown';
import { useSessionStore } from '@/stores/useSessionStore';
import { usePathname, useRouter } from '@/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/lib/hooks/language/useLanguage';

interface HeaderAvatarProps {}

const HeaderAvatar = ({}: HeaderAvatarProps) => {
  const { convertUserName } = useLanguage();
  const t = useTranslations('UserAuth');

  const path = usePathname();
  const router = useRouter();
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const { user, isAdmin, logout } = useSessionStore((state) => ({
    user: state.user,
    isAdmin: state.isAdmin,
    logout: state.logout,
  }));

  const isAdminPenal = path.startsWith('/admin');

  const handleOpen = () => setIsShowDropDown(true);
  const handleClose = () => setIsShowDropDown(false);

  const handleNavigateTo = (href: string) => {
    router.push(href);
    handleClose();
  };

  const handleSignOut = async () => {
    const res = await logout();
    if (res) {
      handleClose();
    }
  };

  return (
    <div>
      <div role="button" onClick={handleOpen}>
        <AvatarShow image={user?.avatar} sizeClassName="size-10" greenDot />
      </div>
      {isShowDropDown && (
        <DropDown
          onClose={handleClose}
          sizeClassName="max-w-full sm:max-w-64 w-full"
          positionClassName="right-0 -bottom-2"
          roundedClassName="rounded-md"
        >
          <div className="divide-y divide-slate-600/20">
            <button
              onClick={() => handleNavigateTo('/my-account')}
              className="flex w-full items-center gap-4 p-4 hover:bg-gray-400/10 active:bg-gray-400/20"
            >
              <AvatarShow image={user?.avatar} greenDot sizeClassName="size-10 min-w-10" className="flex-0" />
              <div className="flex-1 max-w-40">
                <div className="text-left text-sm font-semibold text-secondary-text truncate">
                  {convertUserName({
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                  })}
                </div>
                <div className="text-left text-xs font-medium text-secondary-text truncate">
                  {user?.role === 'admin' && t('admin')}
                  {user?.role === 'user' && t('user')}
                  {user?.role !== 'admin' && user?.role !== 'user' && t('anonymous')}
                </div>
              </div>
            </button>
            <button
              onClick={() => handleNavigateTo('/my-account')}
              className="flex w-full items-center gap-4 p-4 hover:bg-gray-400/10 active:bg-gray-400/20"
            >
              <User sizeClassName="size-5" />
              <div className="text-sm font-semibold text-secondary-text">{t('myAccount')}</div>
            </button>
            {(!user || user?.isAnonymous) && (
              <button
                onClick={() => handleNavigateTo('/login')}
                className="flex w-full items-center gap-4 p-4 hover:bg-gray-400/10 active:bg-gray-400/20"
              >
                <Login sizeClassName="size-5" />
                <div className="text-sm font-semibold text-secondary-text">{t('login')}</div>
              </button>
            )}
            {user && !user.isAnonymous && (
              <button
                className="flex w-full items-center gap-4 p-4 hover:bg-gray-400/10 active:bg-gray-400/20"
                onClick={handleSignOut}
              >
                <Logout sizeClassName="size-5" />
                <div className="text-sm font-semibold text-secondary-text">{t('logout')}</div>
              </button>
            )}
            {isAdmin && !isAdminPenal && (
              <button
                className="flex w-full items-center gap-4 p-4 hover:bg-gray-400/10 active:bg-gray-400/20"
                onClick={() => handleNavigateTo('/admin')}
              >
                <AdjustmentHorizontal sizeClassName="size-5" />
                <div className="text-sm font-semibold text-secondary-text">{t('adminPenal')}</div>
              </button>
            )}
            {isAdmin && isAdminPenal && (
              <button
                className="flex w-full items-center gap-4 p-4 hover:bg-gray-400/10 active:bg-gray-400/20"
                onClick={() => handleNavigateTo('/')}
              >
                <StoreFront sizeClassName="size-5" />
                <div className="text-sm font-semibold text-secondary-text">{t('leaveAdminPenal')}</div>
              </button>
            )}
          </div>
        </DropDown>
      )}
    </div>
  );
};

export default HeaderAvatar;
