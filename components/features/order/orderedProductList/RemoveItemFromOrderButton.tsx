'use client';

import XMark from '@/components/icon/XMark';
import { useOrder } from '@/lib/hooks/order/useOrder';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BoxButton from '@/components/form/BoxButton';
import RadioHollow from '@/components/form/RadioHollow';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import IconButton from '@/components/ui/button/IconButton';
import { useTranslations } from 'next-intl';

interface RemoveItemFromOrderButtonProps {
  orderId: string;
  orderItemId: string;
  productName: string;
}

const RemoveItemFromOrderButton = ({ orderId, orderItemId, productName }: RemoveItemFromOrderButtonProps) => {
  const t = useTranslations('Delete');

  const [incrementProductStock, setIncrementProductStock] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isWriting, removeItemFromOrder } = useOrder();

  const handleRemove = async () => {
    const res = await removeItemFromOrder({ orderId, orderItemId, incrementProductStock });
    if (res) {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <HoverPopup message={t('remove')} algin="right" position="bottom">
        <IconButton disabled={false} theme="danger" type="button" onClick={() => setIsDeleting(true)}>
          <XMark
            sizeClassName="size-4"
            className="text-danger transition-all group-hover:text-opacity-85 group-active:text-opacity-70"
          />
        </IconButton>
      </HoverPopup>
      <AnimatePresence>
        {isDeleting && (
          <PopUpModal
            scrollbar
            roundedClassName="rounded-xl"
            sizeClassName="max-w-md w-full"
            className="p-8 space-y-4"
            backdrop
            onClose={() => setIsDeleting(false)}
          >
            <div className="space-y-1">
              <div className="font-semibold text-primary-text">{t('confirmation', { name: t('product') })}</div>
              <div className="font-semibold text-secondary-text">{productName}</div>
              <div className="font-bold text-danger">{t('caution')}</div>
            </div>
            <button className="flex gap-2 items-center group" onClick={() => setIncrementProductStock((prev) => !prev)}>
              <RadioHollow isSelected={incrementProductStock} theme="primary" size="sm" />
              <div className="font-semibold text-secondary-text group-hover:text-opacity-85 group-active:text-opacity-70 transition-all">
                {t('updateTheProductStockAlso')}
              </div>
            </button>
            <div className="ml-auto max-w-min">
              <BoxButton onClick={handleRemove} type="button" disabled={isWriting} theme="danger">
                {t('confirm')}
              </BoxButton>
            </div>
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default RemoveItemFromOrderButton;
