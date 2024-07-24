'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import PaginationClient from '@/components/search/PaginationClient';
import UserOrderSkeleton from './UserOrderSkeleton';
import Th from '@/components/table/Th';
import TrHead from '@/components/table/TrHead';
import { Order } from '@/models/order/Order';
import UserOrderList from './UserOrderList';
import { useTranslations } from 'next-intl';

interface UserOrderTableProps {
  isLoading: boolean;
  error?: string;
  orders: Order[];
  displayOrders: Order[];
  mode: 'admin' | 'user';
}

const UserOrderTable = ({ displayOrders, isLoading, orders, error, mode }: UserOrderTableProps) => {
  const t = useTranslations('Order.list');

  return (
    <div className="space-y-4">
      <div className="relative">
        {isLoading && <LoadingShimmer gradient="white" />}
        <table className="w-full">
          <thead>
            <TrHead>
              {/* id */}
              <Th searchParamsValue="id" hidden="xl">
                {t('id')}
              </Th>
              {/* status */}
              <Th searchParamsValue="status" className="whitespace-nowrap">
                {t('status')}
              </Th>
              {/* deliveryAddress */}
              <Th hidden="lg">{t('deliveryAddress')}</Th>
              {/* orderItems */}
              <Th>{t('orderedProducts')}</Th>
              {/* price */}
              <Th searchParamsValue="price" hidden="sm">
                <div>{t('price')}</div>
                <div className="text-xs">({t('discount')})</div>
                <div className="text-xs">({t('deliveryCharge')})</div>
              </Th>
              {/* time */}
              <Th searchParamsValue="paidAt" hidden="xl">
                {t('time')}
              </Th>
              {/* actions */}
              <Th className="whitespace-nowrap">{t('actions')}</Th>
            </TrHead>
          </thead>
          <tbody>
            {isLoading && <UserOrderSkeleton />}
            {!isLoading && <UserOrderList orders={displayOrders} mode={mode} />}
          </tbody>
        </table>
        {!isLoading && (!orders || orders.length === 0) && (
          <div className="text-sm font-medium text-secondary-text m-2">{t('noItems')}</div>
        )}
        {!isLoading && orders && orders.length > 0 && (!displayOrders || displayOrders.length === 0) && (
          <div className="text-sm font-medium text-secondary-text m-2">{t('noItemsMatchSearching')}</div>
        )}
        {error && <ErrorTranslation error={error} />}
      </div>
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <PaginationIndicatorClient itemName={t('indicator')} itemsLength={orders?.length} />
        <PaginationClient theme="primary" itemsLength={orders?.length} />
      </div>
    </div>
  );
};
export default UserOrderTable;
