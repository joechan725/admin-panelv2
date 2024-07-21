'use client';

import { useAdminOrderListsListener } from '@/lib/hooks/user/admin/order/useAdminOrderListsListener';
import { useParams, useSearchParams } from 'next/navigation';
import { searchAndOrderUserOrders } from './searchAndOrderUserOrders';
import UserOrderTable from './UserOrderTable';

interface LoadAdminOrdersProps {}

const LoadAdminOrders = ({}: LoadAdminOrdersProps) => {
  const params = useParams<{ userId: string }>();
  const searchParams = useSearchParams();
  const { userId } = params;
  const { orders, error, isLoading } = useAdminOrderListsListener(userId);
  const displayOrders = searchAndOrderUserOrders({ orders, searchParams });

  return (
    <UserOrderTable displayOrders={displayOrders} isLoading={isLoading} orders={orders} error={error} mode="admin" />
  );
};

export default LoadAdminOrders;
