import BoxButton from '@/components/form/BoxButton';
import Plus from '@/components/icon/Plus';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

interface AddAddressLinkProps {}

const AddAddressLink = ({}: AddAddressLinkProps) => {
  const t = useTranslations('Address.address');

  return (
    <Link href="/my-account/addresses/create">
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
