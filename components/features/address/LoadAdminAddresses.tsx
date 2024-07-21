'use client';

import { useAdminUserStoredListListener } from '@/lib/hooks/user/admin/useAdminUserStoredListListener';
import { useParams } from 'next/navigation';
import AddressesFrame from './AddressesFrame';

interface LoadAdminAddressesProps {}

const LoadAdminAddresses = ({}: LoadAdminAddressesProps) => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;

  const { addresses, isLoading, error } = useAdminUserStoredListListener(userId);

  return <AddressesFrame isLoading={isLoading} addresses={addresses} mode="user" error={error} />;
};

export default LoadAdminAddresses;
