'use client';

import BoxButton from '@/components/form/BoxButton';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useCollection } from '@/lib/hooks/classification/useCollection';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CollectionsDeleteButtonProps {
  selectedCollectionIds: string[];
  onDelete?: () => void;
}
const CollectionsDeleteButton = ({ selectedCollectionIds, onDelete }: CollectionsDeleteButtonProps) => {
  const t = useTranslations('Delete');

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeCollections } = useCollection();

  const handleDelete = async () => {
    const res = await removeCollections(selectedCollectionIds);
    if (res) {
      if (onDelete) {
        onDelete();
      }
      setIsDeleting(false);
    }
  };

  return (
    selectedCollectionIds.length > 0 && (
      <>
        <div>
          <BoxButton type="button" onClick={() => setIsDeleting(true)} theme="danger" disabled={isWriting}>
            {t('deleteItems', { name: t('collection') })}
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
                  {t('confirmationForItems', { itemCount: selectedCollectionIds.length, name: t('collection') })}
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
export default CollectionsDeleteButton;
