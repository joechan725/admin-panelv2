'use client';

import { useUserOrderListsListener } from '@/lib/hooks/user/user/order/useUserOrderListsListener';
import { useSearchParams } from 'next/navigation';
import { searchAndOrderUserOrders } from './searchAndOrderUserOrders';
import UserOrderTable from './UserOrderTable';

interface LoadUserOrdersProps {}

const LoadUserOrders = ({}: LoadUserOrdersProps) => {
  const searchParams = useSearchParams();
  const { orders, isLoading, error } = useUserOrderListsListener();
  const displayOrders = searchAndOrderUserOrders({ orders, searchParams });

  return (
    <UserOrderTable displayOrders={displayOrders} orders={orders} isLoading={isLoading} error={error} mode="user" />
  );
};

export default LoadUserOrders;
