'use client';

import Edit from '@/components/icon/Edit';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface AdminEditAddressLinkProps {
  addressId: string;
}

const AdminEditAddressLink = ({ addressId }: AdminEditAddressLinkProps) => {
  const t = useTranslations('Address.address');

  const params = useParams<{ userId: string }>();
  const { userId } = params;

  return (
    <HoverPopup message={t('edit')}>
      <IconButton disabled={false} theme="secondary" type="button">
        <Link href={`/admin/users/${userId}/addresses/${addressId}/edit`}>
          <Edit />
        </Link>
      </IconButton>
    </HoverPopup>
  );
};

export default AdminEditAddressLink;
