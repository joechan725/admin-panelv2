import LoadUserAddresses from '@/components/features/address/LoadUserAddresses';
import LightBorder from '@/components/layout/container/LightBorder';
import AddAddressLink from '../link/AddAddressLink';
import { useTranslations } from 'next-intl';

interface AddressRootProps {}

const AddressRoot = ({}: AddressRootProps) => {
  const t = useTranslations('Address.address');

  return (
    <LightBorder className="min-h-60 p-6 w-full">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold text-primary-text">{t('title')}</div>
          <AddAddressLink />
        </div>
        <hr className="h-0.5 w-full bg-slate-600/20" />
      </div>
      <LoadUserAddresses />
    </LightBorder>
  );
};

export default AddressRoot;
