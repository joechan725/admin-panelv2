'use client';

import { AnimatePresence } from 'framer-motion';
import { useRouter } from '@/navigation';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import ApplyRefundForm from '../form/ApplyRefundForm';

interface ApplyRefundModalProps {}

const ApplyRefundModal = ({}: ApplyRefundModalProps) => {
  const [isShow, setIsShow] = useState(true);
  const router = useRouter();
  const params = useParams<{ orderId: string }>();
  const searchParams = useSearchParams();
  const queryCode = searchParams.get('queryCode');

  const { orderId } = params;

  const handleBack = () => {
    setIsShow(false);
    const backUrl = queryCode === null ? `/orders/${orderId}` : `/orders/${orderId}?queryCode=${queryCode}`;
    setTimeout(() => router.push(backUrl), 300);
  };

  return (
    <AnimatePresence>
      {isShow && (
        <PopUpModal
          onClose={handleBack}
          backdrop
          closeButton
          className="p-16"
          sizeClassName="max-w-screen-md w-full"
          scrollbar
        >
          <ApplyRefundForm />
        </PopUpModal>
      )}
    </AnimatePresence>
  );
};

export default ApplyRefundModal;
