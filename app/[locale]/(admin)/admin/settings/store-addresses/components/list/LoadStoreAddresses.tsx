'use client';

import { useStoreAddressListListener } from '@/lib/hooks/storeAddress/useStoreAddressListListener';
import StoreAddressSkeleton from './StoreAddressSkeleton';
import StoreAddressList from './StoreAddressList';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import { useTranslations } from 'next-intl';

interface LoadStoreAddressesProps {}
const LoadStoreAddresses = ({}: LoadStoreAddressesProps) => {
  const t = useTranslations('Address.storeAddress');

  const { storeAddresses, isLoading, error } = useStoreAddressListListener();

  return (
    <>
      {isLoading && <StoreAddressSkeleton />}
      {!isLoading && (!storeAddresses || storeAddresses.length === 0) && (
        <div className="text-sm font-semibold text-gray-500">{t('noItems')}</div>
      )}
      {!isLoading && <StoreAddressList storeAddresses={storeAddresses} />}
      <ErrorTranslation error={error} />
    </>
  );
};
export default LoadStoreAddresses;
