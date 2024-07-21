'use client';

import PopUpModal from '@/components/ui/popup/PopUpModal';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from '@/navigation';
import { useState } from 'react';
import CreateStoreAddressForm from '../form/CreateStoreAddressForm';

interface CreateStoreAddressModalProps {}

const CreateStoreAddressModal = ({}: CreateStoreAddressModalProps) => {
  const [isShow, setIsShow] = useState(true);

  const router = useRouter();

  const handleClose = () => {
    setIsShow(false);
    setTimeout(() => router.push('/admin/settings/store-addresses'), 300);
  };

  return (
    <AnimatePresence>
      {isShow && (
        <PopUpModal
          backdrop
          onClose={handleClose}
          closeButton
          sizeClassName="max-w-screen-md w-full"
          className="p-12"
          scrollbar
        >
          <CreateStoreAddressForm onSuccess={handleClose} />
        </PopUpModal>
      )}
    </AnimatePresence>
  );
};

export default CreateStoreAddressModal;
