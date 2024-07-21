'use client';

import Edit from '@/components/icon/Edit';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

interface UserEditAddressLinkProps {
  addressId: string;
}

const UserEditAddressLink = ({ addressId }: UserEditAddressLinkProps) => {
  const t = useTranslations('Address.address');

  const router = useRouter();

  const handleNavigateToEdit = () => {
    if (addressId === 'loading') {
      toast.error('You are attempting too many actions too quickly. Please try again later.');
      return;
    }
    router.push(`/my-account/addresses/${addressId}/edit`);
  };

  return (
    <HoverPopup message={t('edit')}>
      <IconButton onClick={handleNavigateToEdit} theme="secondary" disabled={false} type="button">
        <Edit />
      </IconButton>
    </HoverPopup>
  );
};

export default UserEditAddressLink;
