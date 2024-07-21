'use client';

import { useState } from 'react';
import AdjustmentHorizontal from '@/components/icon/AdjustmentHorizontal';
import IconCircleButton from '@/components/ui/button/IconCircleButton';
import PopUpLeftBar from '@/components/ui/popup/PopUpLeftBar';
import { AnimatePresence } from 'framer-motion';
import AdminSidebar from './AdminSidebar';

interface ToggleAdminSideBarProps {}

const ToggleAdminSideBar = ({}: ToggleAdminSideBarProps) => {
  const [isShowSideBar, setIsShowSideBar] = useState(false);

  return (
    <>
      <div className="lg:hidden">
        <IconCircleButton
          theme="primary"
          className="fixed bottom-16 left-3 z-[99]"
          onClick={() => setIsShowSideBar(true)}
          disabled={false}
          type="button"
        >
          <AdjustmentHorizontal sizeClassName="size-6" />
        </IconCircleButton>
      </div>
      <AnimatePresence>
        {isShowSideBar && (
          <PopUpLeftBar
            backdrop
            onClose={() => setIsShowSideBar(false)}
            backgroundColorClassName="bg-primary-bg"
            roundedClassName="rounded-r-lg"
            sizeClassName="min-h-screen max-w-64 w-full"
          >
            <AdminSidebar onClose={() => setIsShowSideBar(false)} className="rounded-r-lg" />
          </PopUpLeftBar>
        )}
      </AnimatePresence>
    </>
  );
};

export default ToggleAdminSideBar;
