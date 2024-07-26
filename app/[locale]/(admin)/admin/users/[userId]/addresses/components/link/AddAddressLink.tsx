'use client';

import BoxButton from '@/components/form/BoxButton';
import Plus from '@/components/icon/Plus';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface AddAddressLinkProps {}

const AddAddressLink = ({}: AddAddressLinkProps) => {
  const t = useTranslations('Address.address');

  const params = useParams<{ userId: string }>();
  const { userId } = params;
  return (
    <Link href={`/admin/users/${userId}/addresses/create`}>
      <BoxButton disabled={false} theme="primary" type="button" fontSize="sm">
        <div className="flex items-center gap-2">
          <Plus sizeClassName="size-4" />
          {t('add')}
        </div>
      </BoxButton>
    </Link>
  );
};

export default AddAddressLink;
