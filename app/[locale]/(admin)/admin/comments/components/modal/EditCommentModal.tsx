'use client';

import { AnimatePresence } from 'framer-motion';
import { useRouter } from '@/navigation';
import { useState } from 'react';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import LoadEditCommentForm from '@/components/features/comment/form/LoadEditCommentForm';

type EditCommentModalProps = CommentPageProps | UserPageProps;

interface CommentPageProps {
  page: 'comment';
  userId?: undefined;
}

interface UserPageProps {
  page: 'user';
  userId: string;
}

const EditCommentModal = ({ page, userId }: EditCommentModalProps) => {
  const [isShow, setIsShow] = useState(true);

  const router = useRouter();

  const handleBack = () => {
    setIsShow(false);
    const backUrl = page === 'user' ? `/admin/users/${userId}/comments` : '/admin/comments';
    setTimeout(() => router.push(backUrl), 300);
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
