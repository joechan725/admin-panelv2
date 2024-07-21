'use client';

import { useState } from 'react';
import AdjustmentHorizontal from '@/components/icon/AdjustmentHorizontal';
import PopUpLeftBar from '@/components/ui/popup/PopUpLeftBar';
import { AnimatePresence } from 'framer-motion';
import IconButton from '@/components/ui/button/IconButton';
import SettingSideBar from './SettingSideBar';

interface ToggleSettingSideBarProps {}

const ToggleSettingSideBar = ({}: ToggleSettingSideBarProps) => {
  const [isShowSideBar, setIsShowSideBar] = useState(false);

  return (
    <>
      <div className="block xl:hidden">
        <IconButton theme="primary" onClick={() => setIsShowSideBar(true)} disabled={false} type="button">
          <AdjustmentHorizontal sizeClassName="size-6" />
        </IconButton>
      </div>
      <AnimatePresence>
        {isShowSideBar && (
          <PopUpLeftBar
            backdrop
            onClose={() => setIsShowSideBar(false)}
            className="py-10"
            closeButton
            roundedClassName="rounded-r-lg"
            sizeClassName="min-h-screen max-w-64 w-full"
          >
            <SettingSideBar />
          </PopUpLeftBar>
        )}
      </AnimatePresence>
    </>
  );
};

export default ToggleSettingSideBar;
