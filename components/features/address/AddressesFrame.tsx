import ErrorTranslation from '@/components/form/ErrorTranslation';
import AddressList from './AddressList';
import AddressSkeleton from './AddressSkeleton';
import { Address } from '@/models/Address';
import { useTranslations } from 'next-intl';

interface AddressesFrameProps {
  isLoading: boolean;
  error?: string;
  addresses: Address[];
  mode: 'admin' | 'user';
}

const AddressesFrame = ({ isLoading, addresses, error, mode }: AddressesFrameProps) => {
  const t = useTranslations('Address.address');

  return (
    <div className="mt-4">
      {isLoading && <AddressSkeleton />}
      {!isLoading && (!addresses || addresses.length === 0) && (
        <div className="text-sm font-medium text-secondary-text">{t('noItems')}</div>
      )}
      {!isLoading && <AddressList addresses={addresses} mode={mode} />}
      <ErrorTranslation error={error} />
    </div>
  );
};

export default AddressesFrame;
