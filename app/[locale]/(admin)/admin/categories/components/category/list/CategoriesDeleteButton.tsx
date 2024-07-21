'use client';

import BoxButton from '@/components/form/BoxButton';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useCategory } from '@/lib/hooks/classification/useCategory';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CategoriesDeleteButtonProps {
  selectedCategoryIds: string[];
  onDelete?: () => void;
}
const CategoriesDeleteButton = ({ selectedCategoryIds, onDelete }: CategoriesDeleteButtonProps) => {
  const t = useTranslations('Delete');

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeCategories } = useCategory();

  const handleDelete = async () => {
    const res = await removeCategories(selectedCategoryIds);
    if (res) {
      if (onDelete) {
        onDelete();
      }
      setIsDeleting(false);
    }
  };

  return (
    selectedCategoryIds.length > 0 && (
      <>
        <div>
          <BoxButton type="button" onClick={() => setIsDeleting(true)} theme="danger" disabled={isWriting}>
            {t('deleteItems', { name: t('category') })}
          </BoxButton>
        </div>
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
                  {t('confirmationForItems', { itemCount: selectedCategoryIds.length, name: t('category') })}
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
export default CategoriesDeleteButton;
