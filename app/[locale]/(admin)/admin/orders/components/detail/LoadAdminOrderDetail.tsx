'use client';

import { useOrderListener } from '@/lib/hooks/order/useOrderListener';
import { notFound, useParams } from 'next/navigation';
import AdminOrderDetail from './AdminOrderDetail';
import AdminOrderDetailSkeleton from './AdminOrderDetailSkeleton';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface LoadAdminOrderDetailProps {}

const LoadAdminOrderDetail = ({}: LoadAdminOrderDetailProps) => {
  const params = useParams<{ orderId: string }>();

  const { orderId } = params;

  const { order, error, isLoading } = useOrderListener(orderId);

  if (isLoading) {
    return <AdminOrderDetailSkeleton />;
  }

  if (!order && !error) {
    notFound();
  }

  return (
    <>
      {error && <ErrorTranslation error={error} />}
      {order && <AdminOrderDetail order={order} />}
    </>
  );
};

export default LoadAdminOrderDetail;
