'use client';

import PopUpModal from '@/components/ui/popup/PopUpModal';
import { AnimatePresence } from 'framer-motion';
import { notFound, useRouter } from '@/navigation';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import EditAddressForm from '../form/EditAddressForm';
import { useAddressStore } from '@/stores/useAddressStore';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface EditAddressModalProps {}

const EditAddressModal = ({}: EditAddressModalProps) => {
  const [isShow, setIsShow] = useState(true);
  const params = useParams<{ addressId: string }>();
  const { addressId } = params;

  const { addresses, isLoading, loadingError } = useAddressStore((state) => ({
    addresses: state.addresses,
    isLoading: state.isLoading,
    loadingError: state.loadingError,
  }));

  const address = addresses.find((address) => address.id === addressId);

  const router = useRouter();

  const handleClose = () => {
    setIsShow(false);
    setTimeout(() => router.push('/my-account/addresses'), 300);
  };

  if (!isLoading && !address) {
    notFound();
  }

  return (
    <AnimatePresence>
      {isShow && (
        <PopUpModal backdrop onClose={handleClose} closeButton sizeClassName="max-w-screen-md w-full" className="p-12">
          {!isLoading && address && <EditAddressForm address={address} onClose={handleClose} />}
          {!isLoading && <ErrorTranslation error={loadingError} />}
        </PopUpModal>
      )}
    </AnimatePresence>
  );
};

export default EditAddressModal;
