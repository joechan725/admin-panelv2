'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import { useAdminAddress } from '@/lib/hooks/user/admin/address/useAdminAddress';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import EditUserAddressForm from './EditUserAddressForm';
import LoadingSpin from '@/components/loading/LoadingSpin';

interface LoadEditUserAddressFormProps {
  onSuccess?: () => void;
}

const LoadEditUserAddressForm = ({ onSuccess }: LoadEditUserAddressFormProps) => {
  const params = useParams<{ userId: string; addressId: string }>();
  const { userId, addressId } = params;

  const { address, loadAddress, isLoading, error } = useAdminAddress();

  useEffect(() => {
    loadAddress({ userId, addressId });
  }, [userId, addressId]);

  if (!isLoading && !address) {
    notFound();
  }

  return (
    <>
      {isLoading && <LoadingSpin layout="global" theme="secondary" />}
      {!isLoading && address && <EditUserAddressForm address={address} onSuccess={onSuccess} />}
      {error && <ErrorTranslation error={error} />}
    </>
  );
};

export default LoadEditUserAddressForm;
