'use client';

import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { Order } from '@/models/order/Order';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Edit from '@/components/icon/Edit';
import EditOrderInformationForm from '../form/EditOrderInformationForm';
import IconButton from '@/components/ui/button/IconButton';
import { useTranslations } from 'next-intl';

interface EditOrderInformationButtonProps {
  order: Order;
}

const EditOrderInformationButton = ({ order }: EditOrderInformationButtonProps) => {
  const t = useTranslations('Order.adminList');

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <HoverPopup message={t('updateOrderInformation')}>
        <IconButton onClick={() => setIsEditing(true)} type="button" theme="secondary" disabled={false}>
          <Edit sizeClassName="size-5" />
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
            <EditOrderInformationForm order={order} onSuccess={() => setIsEditing(false)} />
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditOrderInformationButton;
