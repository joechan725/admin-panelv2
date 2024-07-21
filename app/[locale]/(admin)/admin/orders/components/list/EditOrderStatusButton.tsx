'use client';

import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { Order } from '@/models/order/Order';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import EditOrderStatusForm from '../form/EditOrderStatusForm';
import Trunk from '@/components/icon/Trunk';
import IconButton from '@/components/ui/button/IconButton';
import { useTranslations } from 'next-intl';

interface EditOrderStatusButtonProps {
  order: Order;
}
const EditOrderStatusButton = ({ order }: EditOrderStatusButtonProps) => {
  const t = useTranslations('Order.adminList');

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <HoverPopup message={t('updateOrderStatus')}>
        <IconButton onClick={() => setIsEditing(true)} type="button" theme="secondary" disabled={false}>
          <Trunk sizeClassName="size-5" />
        </IconButton>
      </HoverPopup>
      <AnimatePresence>
        {isEditing && (
          <PopUpModal
            backdrop
            sizeClassName="max-w-screen-md w-full"
            closeButton
            className="p-16"
            scrollbar
            onClose={() => setIsEditing(false)}
          >
            <EditOrderStatusForm order={order} onSuccess={() => setIsEditing(false)} />
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};
export default EditOrderStatusButton;
