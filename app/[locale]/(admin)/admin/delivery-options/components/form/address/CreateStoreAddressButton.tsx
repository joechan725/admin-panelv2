import BoxButton from '@/components/form/BoxButton';
import Plus from '@/components/icon/Plus';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import CreateStoreAddressForm from '../../../../settings/store-addresses/components/form/CreateStoreAddressForm';

interface CreateStoreAddressButtonProps {}

const CreateStoreAddressButton = ({}: CreateStoreAddressButtonProps) => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      <BoxButton disabled={false} type="button" theme="primary" onClick={() => setIsCreating(true)} fontSize="sm">
        <div className="flex gap-2 items-center">
          <Plus className="text-write" sizeClassName="size-4" />
          <span className="text-write text-sm">New address</span>
        </div>
      </BoxButton>
      <AnimatePresence>
        {isCreating && (
          <PopUpModal
            backdrop
            closeButton
            onClose={() => setIsCreating(false)}
            sizeClassName="max-w-screen-md w-full"
            className="p-12"
            scrollbar
          >
            <CreateStoreAddressForm onSuccess={() => setIsCreating(false)} />
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateStoreAddressButton;
