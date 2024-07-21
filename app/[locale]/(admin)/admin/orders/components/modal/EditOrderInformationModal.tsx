'use client';

import { AnimatePresence } from 'framer-motion';
import { useRouter } from '@/navigation';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import LoadEditOrderInformationForm from '../form/LoadEditOrderInformationForm';

interface EditOrderInformationModalProps {}

const EditOrderInformationModal = ({}: EditOrderInformationModalProps) => {
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
          sizeClassName="max-w-screen-md w-full"
          scrollbar
        >
          <LoadEditOrderInformationForm onSuccess={handleBack} />
        </PopUpModal>
      )}
    </AnimatePresence>
  );
};

export default EditOrderInformationModal;
