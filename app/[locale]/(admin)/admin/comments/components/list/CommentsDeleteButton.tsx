'use client';

import BoxButton from '@/components/form/BoxButton';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useComment } from '@/lib/hooks/comment/useComment';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CommentsDeleteButtonProps {
  selectedIds: { productId: string; commentId: string }[];
  onDelete?: () => void;
}

const CommentsDeleteButton = ({ selectedIds, onDelete }: CommentsDeleteButtonProps) => {
  const tComment = useTranslations('Comment.adminList');
  const t = useTranslations('Delete');

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeComments } = useComment();

  const handleDelete = async () => {
    const res = await removeComments({ ids: selectedIds });
    if (res) {
      if (onDelete) {
        onDelete();
      }
      setIsDeleting(false);
    }
  };

  return (
    selectedIds.length > 0 && (
      <>
        <div>
          <BoxButton type="button" onClick={() => setIsDeleting(true)} theme="danger" disabled={isWriting}>
            {t('deleteItems', { name: t('coupon') })}
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
                  {t('confirmationForItems', { name: tComment('indicator'), itemCount: selectedIds.length })}
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

export default CommentsDeleteButton;
