'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import LoadingSpin from '@/components/loading/LoadingSpin';
import { useOrder } from '@/lib/hooks/order/useOrder';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import EditOrderStatusForm from './EditOrderStatusForm';

interface LoadEditOrderStatusFormProps {
  onSuccess: () => void;
}

const LoadEditOrderStatusForm = ({ onSuccess }: LoadEditOrderStatusFormProps) => {
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
      <EditOrderStatusForm order={order} onSuccess={onSuccess} />
    </div>
  );
};

export default LoadEditOrderStatusForm;
