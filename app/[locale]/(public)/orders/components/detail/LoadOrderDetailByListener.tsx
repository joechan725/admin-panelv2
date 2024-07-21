'use client';

import { useOrderListener } from '@/lib/hooks/order/useOrderListener';
import OrderDetailSkeleton from './OrderDetailSkeleton';
import ShadowBorder from '@/components/layout/container/ShadowBorder';
import SearchOrderForm from '../search/SearchOrderForm';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import OrderDetail from './OrderDetail';
import { notFound } from 'next/navigation';

interface LoadOrderDetailByListenerProps {
  orderId: string;
}

const LoadOrderDetailByListener = ({ orderId }: LoadOrderDetailByListenerProps) => {
  const { order, error, isLoading } = useOrderListener(orderId);

  if (!isLoading && !order && !error) {
    notFound();
  }

  return (
    <div className="space-y-5">
      {isLoading && <OrderDetailSkeleton />}
      {!isLoading && (!order || error) && (
        <div className="flex h-screen justify-center items-center">
          <ShadowBorder sizeClassName="max-w-lg w-full">
            <SearchOrderForm orderId={orderId} />
            <ErrorTranslation error={error} />
          </ShadowBorder>
        </div>
      )}
      {order && <OrderDetail order={order} />}
    </div>
  );
};

export default LoadOrderDetailByListener;
