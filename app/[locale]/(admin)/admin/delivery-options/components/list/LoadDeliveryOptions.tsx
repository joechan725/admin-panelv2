'use client';

import { usePrivateDeliveryOptionListsListener } from '@/lib/hooks/deliveryOption/usePrivateDeliveryOptionListsListener';
import { useSearchParams } from 'next/navigation';
import { searchAndOrderDeliveryOptions } from './searchAndOrderDeliveryOptions';
import DeliveryOptionTable from './DeliveryOptionTable';

interface LoadDeliveryOptionsProps {
  onSelect?: (id: string) => void;
  selectedDeliveryOptionIds?: string[];
}

const LoadDeliveryOptions = ({ onSelect, selectedDeliveryOptionIds }: LoadDeliveryOptionsProps) => {
  const { privateDeliveryOptions, isLoading, error } = usePrivateDeliveryOptionListsListener();
  const searchParams = useSearchParams();
  const displayDeliveryOptions = searchAndOrderDeliveryOptions({ searchParams, privateDeliveryOptions });

  return (
    <DeliveryOptionTable
      displayDeliveryOptions={displayDeliveryOptions}
      privateDeliveryOptions={privateDeliveryOptions}
      isLoading={isLoading}
      error={error}
      onSelect={onSelect}
      selectedDeliveryOptionIds={selectedDeliveryOptionIds}
    />
  );
};

export default LoadDeliveryOptions;
