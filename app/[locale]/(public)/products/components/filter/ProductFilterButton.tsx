'use client';

import Funnel from '@/components/icon/Funnel';
import IconCircleButton from '@/components/ui/button/IconCircleButton';
import PopUpBottomBar from '@/components/ui/popup/PopUpBottomBar';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ProductFilter from './ProductFilter';

interface ProductFilterButtonProps {
  href?: string;
  hiddenBreakPoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const ProductFilterButton = ({ href, hiddenBreakPoint }: ProductFilterButtonProps) => {
  const [isShowBottomBar, setIsShowBottomBar] = useState(false);

  return (
    <>
      <div className={`${hiddenBreakPoint}:hidden`}>
        <IconCircleButton
          theme="primary"
          className="fixed bottom-16 right-3 z-[99]"
          onClick={() => setIsShowBottomBar(true)}
          type="button"
          disabled={false}
        >
          <Funnel sizeClassName="size-6" />
        </IconCircleButton>
      </div>
      <AnimatePresence>
        {isShowBottomBar && (
          <PopUpBottomBar
            scrollbar
            closeButton
            backdrop
            onClose={() => setIsShowBottomBar(false)}
            className="p-8"
            roundedClassName="rounded-t-lg"
            sizeClassName="max-h-[calc(100vh-80px)] h-full max-w-screen w-full"
          >
            <ProductFilter href={href} />
          </PopUpBottomBar>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductFilterButton;
