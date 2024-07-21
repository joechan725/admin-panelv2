'use client';

import PopUpRightBar from '@/components/ui/popup/PopUpRightBar';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from '@/navigation';
import { useState } from 'react';
import LoadEditDeliveryOptionForm from '../form/LoadEditDeliveryOptionForm';

interface EditDeliveryOptionModalProps {}

const EditDeliveryOptionModal = ({}: EditDeliveryOptionModalProps) => {
  const router = useRouter();
  const [isShow, setIsShow] = useState(true);
  const handleBack = () => {
    setIsShow(false);
    setTimeout(() => router.push('/admin/delivery-options'), 300);
  };

  return (
    <AnimatePresence>
      {isShow && (
        <PopUpRightBar
          backdrop
          roundedClassName="rounded-l-lg"
          onClose={handleBack}
          sizeClassName="max-w-2xl w-full h-full"
          className="pt-8 pb-12 px-16"
          scrollbar
          closeButton
        >
          <LoadEditDeliveryOptionForm onSuccess={handleBack} />
        </PopUpRightBar>
      )}
    </AnimatePresence>
  );
};

export default EditDeliveryOptionModal;
