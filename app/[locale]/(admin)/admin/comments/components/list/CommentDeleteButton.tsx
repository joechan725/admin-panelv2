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

interface CommentDeleteButtonProps {
  comment: Comment;
}

const CommentDeleteButton = ({ comment }: CommentDeleteButtonProps) => {
  const tComment = useTranslations('Comment.adminList');
  const t = useTranslations('Delete');

  const { id, title } = comment;

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeComment } = useComment();

  const handleDelete = async () => {
    const res = await removeComment(id);
    if (res) {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <HoverPopup message={t('delete')}>
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
              <div className="font-semibold text-primary-text">
                {t('confirmation', { name: tComment('indicator') })}
              </div>
              <div className="font-medium text-secondary-text">{title}</div>
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
  );
};

export default CommentDeleteButton;
