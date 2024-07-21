'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Refund from '@/components/icon/Refund';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import SelectRefundMethod from '../form/SelectRefundMethod';
import { Order } from '@/models/order/Order';

interface RefundButtonProps {
  order: Order;
}

const RefundButton = ({ order }: RefundButtonProps) => {
  const [isRefunding, setIsRefunding] = useState(false);

  return (
    <>
      <HoverPopup message="Refund">
        <IconButton onClick={() => setIsRefunding(true)} type="button" theme="danger" disabled={false}>
          <Refund sizeClassName="size-5" />
        </IconButton>
      </HoverPopup>
      <AnimatePresence>
        {isRefunding && (
          <PopUpModal
            backdrop
            sizeClassName="max-w-screen-md w-full"
            closeButton
            className="p-16"
            scrollbar
            onClose={() => setIsRefunding(false)}
          >
            <SelectRefundMethod orderId={order.id} order={order} onSuccess={() => setIsRefunding(false)} />
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default RefundButton;
