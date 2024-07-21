import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BoxButton from '@/components/form/BoxButton';
import Trash from '@/components/icon/Trash';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { StoreAddress } from '@/models/store/StoreAddress';
import { useStoreAddress } from '@/lib/hooks/storeAddress/useStoreAddress';
import IconButton from '@/components/ui/button/IconButton';
import { useTranslations } from 'next-intl';

interface StoreAddressDeleteButtonProps {
  storeAddress: StoreAddress;
}

const StoreAddressDeleteButton = ({ storeAddress }: StoreAddressDeleteButtonProps) => {
  const t = useTranslations('Delete');

  const { id, name, detailAddress } = storeAddress;

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeStoreAddress } = useStoreAddress();

  const handleDelete = async () => {
    const res = await removeStoreAddress(id);
    if (res) {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <HoverPopup message={t('delete')}>
        <IconButton type="button" onClick={() => setIsDeleting(true)} theme="danger" disabled={isWriting}>
          <Trash sizeClassName="size-6" />
        </IconButton>
      </HoverPopup>
      <AnimatePresence>
        {isDeleting && (
          <PopUpModal
            scrollbar
            roundedClassName="rounded-xl"
            sizeClassName="max-w-md w-full"
            className="p-8 space-y-4"
            backdrop
            onClose={() => setIsDeleting(false)}
          >
            <div className="space-y-1">
              <div className="font-semibold text-primary-text">{t('confirmation', { name: t('storeAddress') })}</div>
              <div className="font-medium text-secondary-text">{name}</div>
              <div className="font-medium text-secondary-text">{detailAddress}</div>
              <div className="font-bold text-danger">{t('caution')}</div>
            </div>
            <div className="ml-auto max-w-min mt-4">
              <BoxButton onClick={handleDelete} type="button" disabled={isWriting} theme="danger" fontSize="sm">
                {t('confirm')}
              </BoxButton>
            </div>
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default StoreAddressDeleteButton;
