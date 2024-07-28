'use client';

import BoxButton from '@/components/form/BoxButton';
import Trash from '@/components/icon/Trash';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useReply } from '@/lib/hooks/reply/useReply';
import { Reply } from '@/models/reply/Reply';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface ReplyDeleteButtonProps {
  reply: Reply;
}

const ReplyDeleteButton = ({ reply }: ReplyDeleteButtonProps) => {
  const t = useTranslations('Delete');

  const { id, title, productId } = reply;

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeReply } = useReply();

  const handleDelete = async () => {
    const res = await removeReply({ replyId: id, productId });
    if (res) {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <HoverPopup message={t('delete')}>
        <IconButton type="button" onClick={() => setIsDeleting(true)} disabled={isWriting} theme="danger">
          <Trash sizeClassName="size-4" />
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
              <div className="font-semibold text-primary-text">{t('confirmation', { name: t('reply') })}</div>
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

export default ReplyDeleteButton;
