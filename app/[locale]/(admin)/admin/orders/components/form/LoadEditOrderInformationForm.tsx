'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import LoadingSpin from '@/components/loading/LoadingSpin';
import { useOrder } from '@/lib/hooks/order/useOrder';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import EditOrderInformationForm from './EditOrderInformationForm';

interface LoadEditOrderInformationFormProps {
  onSuccess: () => void;
}

const LoadEditOrderInformationForm = ({ onSuccess }: LoadEditOrderInformationFormProps) => {
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
      <ErrorTranslation error={error} />
      <EditOrderInformationForm order={order} onSuccess={onSuccess} />
    </div>
  );
};

export default LoadEditOrderInformationForm;
