'use client';

import PopUpModal from '@/components/ui/popup/PopUpModal';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from '@/navigation';
import { useState } from 'react';
import CreateUserAddressForm from '../form/CreateUserAddressForm';

interface CreateUserAddressModalProps {}

const CreateUserAddressModal = ({}: CreateUserAddressModalProps) => {
  const [isShow, setIsShow] = useState(true);

  const router = useRouter();

  const handleClose = () => {
    setIsShow(false);
    setTimeout(() => router.push('/my-account/addresses'), 300);
  };

  return (
    <AnimatePresence>
      {isShow && (
        <PopUpModal backdrop onClose={handleClose} closeButton sizeClassName="max-w-screen-md w-full" className="p-12">
          <CreateUserAddressForm onSuccess={handleClose} />
        </PopUpModal>
      )}
    </AnimatePresence>
  );
};

export default CreateUserAddressModal;
