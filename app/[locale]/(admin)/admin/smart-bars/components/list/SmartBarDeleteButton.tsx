'use client';

import BoxButton from '@/components/form/BoxButton';
import Trash from '@/components/icon/Trash';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useSmartBar } from '@/lib/hooks/smartBar/useSmartBar';
import { SmartBar } from '@/models/smartBar/SmartBar';
import { AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

interface SmartBarDeleteButtonProps {
  smartBar: SmartBar;
}

const SmartBarDeleteButton = ({ smartBar }: SmartBarDeleteButtonProps) => {
  const locale = useLocale();
  const t = useTranslations('Delete');

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeSmartBar } = useSmartBar();

  const handleDelete = async () => {
    const res = await removeSmartBar({ smartBarId: smartBar.id, originalIsPublic: smartBar.isPublic });
    if (res) {
      setIsDeleting(false);
    }
  };

  const { titleEN, titleZH, messageEN, messageZH } = smartBar;

  const title = locale === 'en' ? titleEN : titleZH;
  const message = locale === 'en' ? messageEN : messageZH;

  return (
    <>
      <HoverPopup message="Delete">
        <IconButton type="button" onClick={() => setIsDeleting(true)} disabled={isWriting} theme="danger">
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
              <div className="font-semibold text-primary-text">{t('confirmation', { name: t('smartBar') })}</div>
              <div className="font-medium text-secondary-text">{title ?? ''}</div>
              <div className="font-medium text-secondary-text">{message}</div>
              <div className="font-bold text-danger">{t('caution')}</div>
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
  );
};

export default SmartBarDeleteButton;
