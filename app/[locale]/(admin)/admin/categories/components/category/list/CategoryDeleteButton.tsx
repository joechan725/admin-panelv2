'use client';

import BoxButton from '@/components/form/BoxButton';
import Trash from '@/components/icon/Trash';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useCategory } from '@/lib/hooks/classification/useCategory';
import { PrivateCategory } from '@/models/classification/category/PrivateCategory';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CategoryDeleteButtonProps {
  privateCategory: PrivateCategory;
}

const CategoryDeleteButton = ({ privateCategory }: CategoryDeleteButtonProps) => {
  const t = useTranslations('Delete');

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeCategory } = useCategory();

  const handleDelete = async () => {
    const res = await removeCategory(privateCategory.id);
    if (res) {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <HoverPopup message={t('delete')}>
        <IconButton theme="danger" type="button" onClick={() => setIsDeleting(true)} disabled={isWriting}>
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
              <div className="font-semibold text-primary-text">{t('confirmation', { name: t('category') })}</div>
              <div className="font-medium text-secondary-text">{privateCategory.name}</div>
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
export default CategoryDeleteButton;
