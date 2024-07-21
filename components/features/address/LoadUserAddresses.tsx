'use client';

import { useAddressStore } from '@/stores/useAddressStore';
import AddressesFrame from './AddressesFrame';

interface LoadUserAddressesProps {}

const LoadUserAddresses = ({}: LoadUserAddressesProps) => {
  const { addresses, isLoading, loadingError } = useAddressStore((state) => ({
    addresses: state.addresses,
    isLoading: state.isLoading,
    loadingError: state.loadingError,
  }));

  return <AddressesFrame isLoading={isLoading} addresses={addresses} mode="user" error={loadingError} />;
};

export default LoadUserAddresses;
