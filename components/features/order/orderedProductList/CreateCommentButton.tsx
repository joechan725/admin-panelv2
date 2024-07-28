'use client';

import { useState } from 'react';
import Comment from '@/components/icon/Comment';
import { AnimatePresence } from 'framer-motion';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import CreateCommentForm from '../../comment/form/CreateCommentForm';
import IconButton from '@/components/ui/button/IconButton';

interface CreateCommentButtonProps {
  productId: string;
  commentId: string;
}

const CreateCommentButton = ({ productId, commentId }: CreateCommentButtonProps) => {
  const [isShowButton, setIsShowButton] = useState(true);
  const [isCommenting, setIsCommenting] = useState(false);

  const handleSuccess = () => {
    setIsCommenting(false);
    setIsShowButton(false);
  };

  return (
    <>
      {isShowButton && (
        <HoverPopup message="Add comment" algin="right" position="bottom">
          <IconButton onClick={() => setIsCommenting(true)} disabled={false} theme="secondary" type="button">
            <Comment sizeClassName="size-4" />
          </IconButton>
        </HoverPopup>
      )}
      <AnimatePresence>
        {isCommenting && (
          <PopUpModal
            scrollbar
            sizeClassName="max-w-screen-md w-full"
            className="p-8 space-y-4"
            backdrop
            onClose={() => setIsCommenting(false)}
          >
            <CreateCommentForm productId={productId} commentId={commentId} onSuccess={handleSuccess} />
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateCommentButton;
