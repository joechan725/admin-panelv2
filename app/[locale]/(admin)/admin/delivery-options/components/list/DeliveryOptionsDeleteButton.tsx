'use client';

import BoxButton from '@/components/form/BoxButton';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useDeliveryOption } from '@/lib/hooks/deliveryOption/useDeliveryOption';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface DeliveryOptionDeleteButtonProps {
  selectedDeliveryOptionIds: string[];
  onDelete?: () => void;
}
const DeliveryOptionsDeleteButton = ({ selectedDeliveryOptionIds, onDelete }: DeliveryOptionDeleteButtonProps) => {
  const t = useTranslations('Delete');

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeDeliveryOptions } = useDeliveryOption();

  const handleDelete = async () => {
    const res = await removeDeliveryOptions(selectedDeliveryOptionIds);
    if (res) {
      if (onDelete) {
        onDelete();
      }
      setIsDeleting(false);
    }
  };

  return (
    selectedDeliveryOptionIds.length > 0 && (
      <>
        <BoxButton type="button" onClick={() => setIsDeleting(true)} disabled={isWriting} theme="danger">
          {t('deleteItems', { name: t('deliveryOption') })}
        </BoxButton>
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
                <div className="font-semibold text-primary-text">
                  {t('confirmationForItems', {
                    name: t('deliveryOption'),
                    itemCount: selectedDeliveryOptionIds.length,
                  })}
                </div>
                <div className="text-danger font-bold">{t('caution')}</div>
              </div>
              <div className="ml-auto max-w-min mt-4">
                <BoxButton onClick={handleDelete} type="button" disabled={isWriting} theme="danger" fontSize="sm">
                  {t('confirm')}
                </BoxButton>
              </div>
            </PopUpModal>
          )}
        </AnimatePresence>
      </>
    )
  );
};
export default DeliveryOptionsDeleteButton;
