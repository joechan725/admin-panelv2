'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import EditUserAddressForm from './EditStoreAddressForm';
import LoadingSpin from '@/components/loading/LoadingSpin';
import { useStoreAddress } from '@/lib/hooks/storeAddress/useStoreAddress';

interface LoadEditStoreAddressFormProps {
  onSuccess?: () => void;
}

const LoadEditStoreAddressForm = ({ onSuccess }: LoadEditStoreAddressFormProps) => {
  const params = useParams<{ storeAddressId: string }>();
  const { storeAddressId } = params;

  const { storeAddress, loadStoreAddress, isLoading, error } = useStoreAddress();

  useEffect(() => {
    loadStoreAddress(storeAddressId);
  }, [storeAddressId]);

  if (!isLoading && !error && !storeAddress) {
    notFound();
  }

  return (
    <>
      {isLoading && <LoadingSpin layout="global" theme="secondary" />}
      {!isLoading && storeAddress && <EditUserAddressForm storeAddress={storeAddress} onSuccess={onSuccess} />}
      {error && <ErrorTranslation error={error} />}
    </>
  );
};

export default LoadEditStoreAddressForm;
