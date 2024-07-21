'use client';

import { AnimatePresence } from 'framer-motion';
import { useRouter } from '@/navigation';
import { useState } from 'react';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import LoadCreateReplyForm from '../../../../../../../components/features/comment/form/LoadCreateReplyForm';

interface CreateReplyModalProps {}

const CreateReplyModal = ({}: CreateReplyModalProps) => {
  const [isShow, setIsShow] = useState(true);

  const router = useRouter();

  const handleBack = () => {
    setIsShow(false);
    setTimeout(() => router.push('/admin/comments'), 300);
  };

  return (
    <AnimatePresence>
      {isShow && (
        <PopUpModal backdrop onClose={handleBack} closeButton sizeClassName="max-w-screen-md w-full" className="p-16">
          <LoadCreateReplyForm />
        </PopUpModal>
      )}
    </AnimatePresence>
  );
};

export default CreateReplyModal;
