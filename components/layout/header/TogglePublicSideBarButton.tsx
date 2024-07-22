'use client';

import Bar3 from '@/components/icon/Bar3';
import StoreFront from '@/components/icon/StoreFront';
import PopUpLeftBar from '@/components/ui/popup/PopUpLeftBar';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { getPublicNavLinks } from './getPublicNavLinks';
import VertNavItemList from './VertNavItemList';
import LeftArrow from '@/components/icon/LeftArrow';
import { useTranslations } from 'next-intl';

interface TogglePublicSideBarButtonProps {}

const TogglePublicSideBarButton = ({}: TogglePublicSideBarButtonProps) => {
  const [isShowSideBar, setIsShowSideBar] = useState(false);
  const tGeneral = useTranslations('General');
  const t = useTranslations('PublicNavLink');

  return (
    <>
      <div className="flex md:hidden items-center">
        <button onClick={() => setIsShowSideBar(true)} className="group">
          <Bar3
            sizeClassName="size-6"
            className="transition-all text-primary-text group-hover:text-secondary-bg group-active:text-secondary-bg/70"
          />
        </button>
      </div>
      <AnimatePresence>
        {/* Side bar */}
        {isShowSideBar && (
          <PopUpLeftBar
            backdrop
            onClose={() => setIsShowSideBar(false)}
            backgroundColorClassName="bg-primary-bg"
            roundedClassName="rounded-r-lg"
            sizeClassName="min-h-screen max-w-64 w-full"
          >
            <div className="w-full h-screen rounded-r-lg space-y-8 py-6">
              {/* Logo and website name */}
              <div className="flex justify-between px-9">
                <Link href="/">
                  <div className="flex gap-2 items-center">
                    <StoreFront sizeClassName="size-8" className="text-white/50" />
                    <div className="text-white text-2xl font-semibold">{tGeneral('companyName')}</div>
                  </div>
                </Link>
                <button type="button" onClick={() => setIsShowSideBar(false)}>
                  <LeftArrow className="transition-all text-white hover:text-secondary-bg active:text-secondary-bg/70" />
                </button>
              </div>
              {/* Nav Links */}
              <VertNavItemList navLinks={getPublicNavLinks(t)} />
            </div>
          </PopUpLeftBar>
        )}
      </AnimatePresence>
    </>
  );
};

export default TogglePublicSideBarButton;
