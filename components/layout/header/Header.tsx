'use client';

import StoreFront from '@/components/icon/StoreFront';
import HoriNavItemList from './HoriNavItemList';
import { getPublicNavLinks } from './getPublicNavLinks';
import Link from 'next/link';
import NotificationButton from '@/components/features/notification/NotificationButton';
import HeaderAvatar from './HeaderAvatar';
import CartButton from '@/components/features/cart/CartButton';
import TogglePublicSideBarButton from './TogglePublicSideBarButton';
import WishlistButton from '@/components/features/wishlist/WishlistButton';
import ChangeLanguageButton from '@/components/features/language/ChangeLanguageButton';
import { useTranslations } from 'next-intl';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const t = useTranslations('PublicNavLink');
  const tGeneral = useTranslations('General');

  return (
    <div className="sticky bg-white inset-0 h-16 w-screen border-b border-slate-700 flex items-center shadow-md z-[99]">
      <div className="h-full mx-2 md:mx-10 flex items-center gap-4 w-full relative">
        <div className="flex-1 flex items-center gap-4 md:gap-10">
          {/* Toggle Side bar */}
          <TogglePublicSideBarButton />
          {/* Logo and website name */}
          <Link href="/" className="flex gap-2 items-center group">
            <StoreFront
              sizeClassName="size-8"
              className="transition-all text-primary-text group-hover:text-secondary-bg group-active:text-secondary-bg/70"
            />
            <div className="transition-all text-primary-text group-hover:text-secondary-bg group-active:text-secondary-bg/70 font-bold text-xl">
              {tGeneral('companyName')}
            </div>
          </Link>
          {/* Nav Links */}
          <div className="hidden md:block">
            <HoriNavItemList navLinks={getPublicNavLinks(t)} />
          </div>
        </div>
        {/* User Area */}
        <div className="flex-0 flex gap-3 sm:gap-6 items-center">
          <NotificationButton />
          <CartButton />
          <WishlistButton />
          <ChangeLanguageButton />
          <HeaderAvatar />
        </div>
      </div>
    </div>
  );
};

export default Header;
