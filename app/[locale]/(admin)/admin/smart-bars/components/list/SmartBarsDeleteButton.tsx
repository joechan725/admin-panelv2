'use client';

import BoxButton from '@/components/form/BoxButton';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { SmartBarIdAndIsPublic, useSmartBar } from '@/lib/hooks/smartBar/useSmartBar';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface SmartBarsDeleteButtonProps {
  smartBarIdAndIsPublicArray: SmartBarIdAndIsPublic[];
  onDelete?: () => void;
}

const SmartBarsDeleteButton = ({ smartBarIdAndIsPublicArray, onDelete }: SmartBarsDeleteButtonProps) => {
  const t = useTranslations('Delete');

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeSmartBars } = useSmartBar();

  const handleDelete = async () => {
    const res = await removeSmartBars({ smartBarIdAndIsPublicArray });
    if (res) {
      if (onDelete) {
        onDelete();
      }
      setIsDeleting(false);
    }
  };

  return (
    smartBarIdAndIsPublicArray.length > 0 && (
      <>
        <BoxButton type="button" onClick={() => setIsDeleting(true)} disabled={isWriting} theme="danger">
          {t('deleteItems', { name: t('smartBar') })}
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
                  {t('confirmationForItems', { name: t('smartBar'), itemCount: smartBarIdAndIsPublicArray.length })}
                </div>
                <div className="font-bold text-danger">{t('caution')}</div>
              </div>
              <div className="ml-auto max-w-min mt-4">
                <BoxButton onClick={handleDelete} type="button" disabled={isWriting} theme="danger">
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

export default SmartBarsDeleteButton;
