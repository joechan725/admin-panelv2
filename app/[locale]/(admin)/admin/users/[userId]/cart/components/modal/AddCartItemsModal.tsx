'use client';

import { AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useRouter } from '@/navigation';
import { useState } from 'react';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import AddCartItemsSelector from '../cartItemSelector/AddCartItemsSelector';

interface AddCartItemsModalProps {}

const AddCartItemsModal = ({}: AddCartItemsModalProps) => {
  const [isShow, setIsShow] = useState(true);
  const router = useRouter();
  const params = useParams<{ userId: string }>();

  const { userId } = params;

  const handleBack = () => {
    setIsShow(false);
    setTimeout(() => router.push(`/admin/users/${userId}/cart`), 300);
  };

  return (
    <AnimatePresence>
      {isShow && (
        <PopUpModal
          onClose={handleBack}
          backdrop
          closeButton
          className="p-16"
          sizeClassName="max-w-screen-lg w-full"
          scrollbar
        >
          <AddCartItemsSelector onSuccess={handleBack} />
        </PopUpModal>
      )}
    </AnimatePresence>
  );
};

export default AddCartItemsModal;
