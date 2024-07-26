'use client';

import { AnimatePresence } from 'framer-motion';
import { useRouter } from '@/navigation';
import { useState } from 'react';
import LoadEditCommentForm from '@/components/features/comment/form/LoadEditCommentForm';
import PopUpModal from '@/components/ui/popup/PopUpModal';

interface EditCommentModalProps {}

const EditCommentModal = ({}: EditCommentModalProps) => {
  const [isShow, setIsShow] = useState(true);

  const router = useRouter();

  const handleBack = () => {
    setIsShow(false);
    setTimeout(() => router.push('/my-account/comments'), 300);
  };

  return (
    <AnimatePresence>
      {isShow && (
        <PopUpModal backdrop onClose={handleBack} closeButton sizeClassName="max-w-screen-md w-full" className="p-16">
          <LoadEditCommentForm onSuccess={handleBack} />
        </PopUpModal>
      )}
    </AnimatePresence>
  );
};

export default EditCommentModal;
