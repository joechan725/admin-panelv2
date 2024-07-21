'use client';

import OrderTable from './OrderTable';
import { usePrivateOrderListsListener } from '@/lib/hooks/order/usePrivateOrderListsListener';
import { useSearchParams } from 'next/navigation';
import { searchAndOrderOrders } from './searchAndOrderOrders';

interface LoadOrdersProps {}

const LoadOrders = ({}: LoadOrdersProps) => {
  const { privateOrders, error, isLoading } = usePrivateOrderListsListener();
  const searchParams = useSearchParams();
  const displayOrders = searchAndOrderOrders({ searchParams, privateOrders });
  return <OrderTable displayOrders={displayOrders} privateOrders={privateOrders} isLoading={isLoading} error={error} />;
};

export default LoadOrders;
