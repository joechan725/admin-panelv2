'use client';

import PopUpModal from '@/components/ui/popup/PopUpModal';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SubscribeToStockForm from '../form/SubscribeToStockForm';

interface SubscribeToStockButtonContainerProps {
  productId: string;
  children: React.ReactNode;
}

const SubscribeToStockButtonContainer = ({ productId, children }: SubscribeToStockButtonContainerProps) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div role="button" onClick={() => setIsShow(true)} className="w-full">
        {children}
      </div>
      <AnimatePresence>
        {isShow && (
          <PopUpModal
            backdrop
            onClose={() => setIsShow(false)}
            closeButton
            sizeClassName="max-w-screen-md w-full"
            className="p-12"
          >
            <SubscribeToStockForm productId={productId} onSuccess={() => setIsShow(false)} />
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default SubscribeToStockButtonContainer;
