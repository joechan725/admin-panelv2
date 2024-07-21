'use client';

import { usePrivateDeliveryOptionListener } from '@/lib/hooks/deliveryOption/usePrivateDeliveryOptionListener';
import { notFound, useParams } from 'next/navigation';
import DeliveryOptionDetail from './DeliveryOptionDetail';
import LoadingSpin from '@/components/loading/LoadingSpin';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface LoadDeliveryOptionDetailProps {}
const LoadDeliveryOptionDetail = ({}: LoadDeliveryOptionDetailProps) => {
  const params = useParams<{ deliveryOptionId: string }>();
  const { deliveryOptionId } = params;

  const { privateDeliveryOption, error, isLoading } = usePrivateDeliveryOptionListener(deliveryOptionId);

  if (!isLoading && !error && !privateDeliveryOption) {
    notFound();
  }

  return (
    <>
      {isLoading && <LoadingSpin theme="primary" layout="line" />}
      {!isLoading && privateDeliveryOption && <DeliveryOptionDetail privateDeliveryOption={privateDeliveryOption} />}
      {!isLoading && error && <ErrorTranslation error={error} />}
    </>
  );
};
export default LoadDeliveryOptionDetail;
