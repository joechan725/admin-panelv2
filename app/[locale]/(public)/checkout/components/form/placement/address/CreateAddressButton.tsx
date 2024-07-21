import BoxButton from '@/components/form/BoxButton';
import Plus from '@/components/icon/Plus';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import CreateAddressForm from '@/app/[locale]/(public)/(user)/my-account/addresses/components/form/CreateAddressForm';

interface CreateAddressButtonProps {}

const CreateAddressButton = ({}: CreateAddressButtonProps) => {
  const t = useTranslations('Address.address');

  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      <BoxButton disabled={false} type="button" theme="primary" onClick={() => setIsCreating(true)}>
        <div className="flex gap-2 items-center">
          <Plus className="text-write" sizeClassName="size-4" />
          <span className="text-write text-sm">{t('add')}</span>
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
          >
            <CreateAddressForm onClose={() => setIsCreating(false)} />
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateAddressButton;
