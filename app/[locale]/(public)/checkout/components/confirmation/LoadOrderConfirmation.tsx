'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import { notFound, useParams } from 'next/navigation';
import OrderConfirmation from './OrderConfirmation';
import { usePendingOrderListener } from '@/lib/hooks/order/usePendingOrderListener';
import LoadingSpin from '@/components/loading/LoadingSpin';

interface LoadOrderConfirmationProps {}

const LoadOrderConfirmation = ({}: LoadOrderConfirmationProps) => {
  const params = useParams<{ orderId: string }>();

  const { orderId } = params;

  const { pendingOrder, error, isLoading } = usePendingOrderListener(orderId);

  if (isLoading) {
    return (
      <div className="mt-20">
        <LoadingSpin theme="secondary" layout="global" />
      </div>
    );
  }

  if (!pendingOrder) {
    notFound();
  }

  const isPaid = pendingOrder.isPaid;
  if (!isPaid) {
    return (
      <div className="mt-20">
        <LoadingSpin theme="secondary" layout="global" />
      </div>
    );
  }

  if (error) {
    return <ErrorTranslation error={error} />;
  }

  return pendingOrder && <OrderConfirmation order={pendingOrder} />;
};

export default LoadOrderConfirmation;
