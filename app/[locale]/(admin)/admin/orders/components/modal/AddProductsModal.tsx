'use client';

import { AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import AddOrderItemsSelector from '../orderItemSelector/AddOrderItemsSelector';

interface AddProductsModalProps {}

const AddProductsModal = ({}: AddProductsModalProps) => {
  const [isShow, setIsShow] = useState(true);
  const router = useRouter();
  const params = useParams<{ orderId: string }>();

  const { orderId } = params;

  const handleBack = () => {
    setIsShow(false);
    setTimeout(() => router.push(`/admin/orders/${orderId}`), 300);
  };

  return (
    <AnimatePresence>
      {isShow && (
        <PopUpModal
          onClose={handleBack}
          backdrop
          closeButton
          className="p-16"
          sizeClassName="max-w-screen-2xl w-full"
          scrollbar
        >
          <AddOrderItemsSelector onSuccess={handleBack} />
        </PopUpModal>
      )}
    </AnimatePresence>
  );
};

export default AddProductsModal;
