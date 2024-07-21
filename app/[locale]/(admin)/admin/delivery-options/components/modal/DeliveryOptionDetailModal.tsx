'use client';

import { useRouter } from '@/navigation';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import LoadDeliveryOptionDetail from '../detail/LoadDeliveryOptionDetail';

interface DeliveryOptionDetailModalProps {}

const DeliveryOptionDetailModal = ({}: DeliveryOptionDetailModalProps) => {
  const router = useRouter();
  const [isShow, setIsShow] = useState(true);
  const handleBack = () => {
    setIsShow(false);
    setTimeout(() => router.push('/admin/delivery-options'), 300);
  };

  return (
    <AnimatePresence>
      {isShow && (
        <PopUpModal closeButton backdrop onClose={handleBack} sizeClassName="max-w-screen-lg w-full">
          <LoadDeliveryOptionDetail />
        </PopUpModal>
      )}
    </AnimatePresence>
  );
};

export default DeliveryOptionDetailModal;
