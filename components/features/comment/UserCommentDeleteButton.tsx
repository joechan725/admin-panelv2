'use client';

import BoxButton from '@/components/form/BoxButton';
import Trash from '@/components/icon/Trash';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useComment } from '@/lib/hooks/comment/useComment';
import { Comment } from '@/models/comment/Comment';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface UserCommentDeleteButtonProps {
  comment: Comment;
}

const UserCommentDeleteButton = ({ comment }: UserCommentDeleteButtonProps) => {
  const t = useTranslations('Delete');

  const { id, title, productId } = comment;

  const [isDeleting, setIsDeleting] = useState(false);

  const { isLoading, removeComment } = useComment();

  const handleDelete = async () => {
    const res = await removeComment({ commentId: id, productId });
    if (res) {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <HoverPopup message={t('delete')}>
        <IconButton type="button" onClick={() => setIsDeleting(true)} theme="danger" disabled={isLoading}>
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
              <div className="font-semibold text-primary-text">{t('confirmation', { name: t('comment') })}</div>
              <div className="font-medium text-secondary-text">{title}</div>
              <div className="font-bold text-danger">{t('caution')}</div>
            </div>
            <div className="ml-auto max-w-min mt-4">
              <BoxButton onClick={handleDelete} type="button" disabled={isLoading} theme="danger">
                {t('confirm')}
              </BoxButton>
            </div>
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserCommentDeleteButton;
