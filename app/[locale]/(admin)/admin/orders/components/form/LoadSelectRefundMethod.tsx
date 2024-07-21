'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import LoadingSpin from '@/components/loading/LoadingSpin';
import { useOrder } from '@/lib/hooks/order/useOrder';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import SelectRefundMethod from './SelectRefundMethod';

interface LoadSelectRefundMethodProps {
  onSuccess: () => void;
}

const LoadSelectRefundMethod = ({ onSuccess }: LoadSelectRefundMethodProps) => {
  const params = useParams<{ orderId: string }>();

  const { orderId } = params;

  const { order, error, isLoading, loadOrder } = useOrder();

  useEffect(() => {
    loadOrder(orderId);
  }, []);

  if (isLoading) {
    return <LoadingSpin layout="global" theme="secondary" />;
  }

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {error && <ErrorTranslation error={error} />}
      <SelectRefundMethod orderId={orderId} order={order} onSuccess={onSuccess} />
    </div>
  );
};

export default LoadSelectRefundMethod;
