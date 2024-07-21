import { useState } from 'react';
import { useParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import BoxButton from '@/components/form/BoxButton';
import Trash from '@/components/icon/Trash';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useAdminAddress } from '@/lib/hooks/user/admin/address/useAdminAddress';
import { Address } from '@/models/Address';
import IconButton from '@/components/ui/button/IconButton';
import { useTranslations } from 'next-intl';

interface UserAddressDeleteButtonProps {
  address: Address;
}

const UserAddressDeleteButton = ({ address }: UserAddressDeleteButtonProps) => {
  const t = useTranslations('Delete');

  const [isDeleting, setIsDeleting] = useState(false);
  const param = useParams<{ userId: string }>();

  const { removeAddress, isWriting } = useAdminAddress();

  const handleDelete = async () => {
    await removeAddress({ addressId: address.id, userId: param.userId });
    setIsDeleting(false);
  };

  return (
    <>
      <HoverPopup message={t('delete')}>
        <IconButton type="button" disabled={isWriting} onClick={() => setIsDeleting(true)} theme="danger">
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
              <div className="font-semibold text-primary-text">{t('confirmation', { name: t('address') })}</div>
              <div className="font-medium text-secondary-text">{address.remark}</div>
              <div className="font-medium text-secondary-text">{address.detailAddress}</div>
              <div className="font-bold text-danger">{t('caution')}</div>
            </div>
            <div className="ml-auto max-w-min mt-4">
              <BoxButton onClick={handleDelete} type="button" disabled={isWriting} theme="danger">
                {t('confirm')}
              </BoxButton>
            </div>
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserAddressDeleteButton;
