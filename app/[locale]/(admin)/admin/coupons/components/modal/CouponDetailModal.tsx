'use client';

import { useRouter } from '@/navigation';
import { useState } from 'react';
import LoadCouponDetail from '../detail/LoadCouponDetail';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { AnimatePresence } from 'framer-motion';

interface CouponDetailModalProps {}

const CouponDetailModal = ({}: CouponDetailModalProps) => {
  const router = useRouter();

  const [isShow, setIsShow] = useState(true);

  const handleBack = () => {
    setIsShow(false);
    setTimeout(() => router.push('/admin/coupons'), 300);
  };

  return (
    <AnimatePresence>
      {isShow && (
        <PopUpModal closeButton backdrop onClose={handleBack} sizeClassName="max-w-screen-lg w-full">
          <LoadCouponDetail />
        </PopUpModal>
      )}
    </AnimatePresence>
  );
};

export default CouponDetailModal;
