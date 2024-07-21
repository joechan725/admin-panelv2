import OrderDetailSkeleton from './OrderDetailSkeleton';
import ShadowBorder from '@/components/layout/container/ShadowBorder';
import SearchOrderForm from '../search/SearchOrderForm';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import OrderDetail from './OrderDetail';
import { notFound } from 'next/navigation';
import { useOrder } from '@/lib/hooks/order/useOrder';
import { useEffect } from 'react';

interface LoadOrderDetailByCallableProps {
  orderId: string;
  queryCode: string;
}

const LoadOrderDetailByCallable = ({ orderId, queryCode }: LoadOrderDetailByCallableProps) => {
  const { isLoading, order, error, loadOrderByIdAndQueryCode } = useOrder();

  useEffect(() => {
    loadOrderByIdAndQueryCode({ orderId, queryCode });
  }, [orderId, queryCode]);

  if (!isLoading && !order && !error) {
    notFound();
  }

  return (
    <div className="space-y-5">
      {isLoading && <OrderDetailSkeleton />}
      {!isLoading && (!order || error) && (
        <div className="flex h-screen justify-center items-center">
          <ShadowBorder sizeClassName="max-w-lg w-full">
            <SearchOrderForm orderId={orderId} queryCode={queryCode} />
            <ErrorTranslation error={error} />
          </ShadowBorder>
        </div>
      )}
      {order && <OrderDetail order={order} />}
    </div>
  );
};

export default LoadOrderDetailByCallable;
