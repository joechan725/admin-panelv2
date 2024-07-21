'use client';

import { AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import AddWishlistItemsSelector from '../wishlistItemSelector/AddWishlistItemsSelector';

interface AddWishlistItemsModalProps {}

const AddWishlistItemsModal = ({}: AddWishlistItemsModalProps) => {
  const [isShow, setIsShow] = useState(true);
  const router = useRouter();
  const params = useParams<{ userId: string }>();

  const { userId } = params;

  const handleBack = () => {
    setIsShow(false);
    setTimeout(() => router.push(`/admin/users/${userId}/wishlist`), 300);
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
          <AddWishlistItemsSelector onSuccess={handleBack} />
        </PopUpModal>
      )}
    </AnimatePresence>
  );
};

export default AddWishlistItemsModal;
