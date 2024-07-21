'use client';

import BoxButton from '@/components/form/BoxButton';
import Trash from '@/components/icon/Trash';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useDeliveryOption } from '@/lib/hooks/deliveryOption/useDeliveryOption';
import { PrivateDeliveryOption } from '@/models/deliveryOption/PrivateDeliveryOption';
import { AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

interface DeliveryOptionDeleteButtonProps {
  privateDeliveryOption: PrivateDeliveryOption;
}
const DeliveryOptionDeleteButton = ({ privateDeliveryOption }: DeliveryOptionDeleteButtonProps) => {
  const t = useTranslations('Delete');
  const locale = useLocale();

  const { id, nameZH, nameEN } = privateDeliveryOption;

  const [isDeleting, setIsDeleting] = useState(false);

  const { removeDeliveryOption } = useDeliveryOption();

  const handleDelete = async () => {
    const res = await removeDeliveryOption(id);
    if (res) {
      setIsDeleting(false);
    }
  };

  const name = locale === 'en' ? nameEN : nameZH;

  return (
    <>
      <HoverPopup message={t('delete')}>
        <IconButton type="button" onClick={() => setIsDeleting(true)} disabled={false} theme="danger">
          <Trash sizeClassName="size-5" />
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
              <div className="font-semibold text-primary-text">{t('confirmation', { name: t('deliveryOption') })}</div>
              <div className="font-medium text-secondary-text">{name}</div>
              <div className="text-danger font-bold">{t('caution')}</div>
            </div>
            <div className="ml-auto max-w-min mt-4">
              <BoxButton onClick={handleDelete} type="button" disabled={false} theme="danger" fontSize="sm">
                {t('confirm')}
              </BoxButton>
            </div>
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};
export default DeliveryOptionDeleteButton;
