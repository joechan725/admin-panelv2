'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import OrderConfirmationSkeleton from './OrderConfirmationSkeleton';
import { useOrderListener } from '@/lib/hooks/order/useOrderListener';
import { useParams } from 'next/navigation';
import OrderConfirmation from './OrderConfirmation';

interface LoadOrderConfirmationProps {}

const LoadOrderConfirmation = ({}: LoadOrderConfirmationProps) => {
  const params = useParams<{ orderId: string }>();

  const { orderId } = params;

  const { order, error, isLoading } = useOrderListener(orderId);

  if (isLoading) {
    return <OrderConfirmationSkeleton />;
  }

  if (error) {
    return <ErrorTranslation error={error} />;
  }

  return order && <OrderConfirmation order={order} />;
};

export default LoadOrderConfirmation;
