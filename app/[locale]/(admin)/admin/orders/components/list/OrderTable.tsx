'use client';

import Th from '@/components/table/Th';
import PaginationClient from '@/components/search/PaginationClient';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import OrderSkeleton from './OrderSkeleton';
import TrHead from '@/components/table/TrHead';
import { Order } from '@/models/order/Order';
import OrderList from './OrderList';
import { useTranslations } from 'next-intl';

interface OrderTableProps {
  isLoading: boolean;
  privateOrders: Order[];
  displayOrders: Order[];
  error?: string;
}

const OrderTable = ({ isLoading, displayOrders, privateOrders, error }: OrderTableProps) => {
  const t = useTranslations('Order.adminList');

  return (
    <div className="mb-4 relative">
      {isLoading && <LoadingShimmer gradient="gray" roundedClassName="rounded-none" />}
      <table className="w-full">
        <thead>
          <TrHead>
            {/* id */}
            <Th searchParamsValue="id">{t('id')}</Th>
            {/* user */}
            <Th searchParamsValue="user">{t('user')}</Th>
            {/* status */}
            <Th searchParamsValue="status">{t('status')}</Th>
            {/* deliveryAddress */}
            <Th>{t('deliveryAddress')}</Th>
            {/* orderItems */}
            <Th>{t('orderedProducts')}</Th>
            {/* price */}
            <Th searchParamsValue="price">
              <div>{t('price')}</div>
              <div className="text-xs">({t('discount')})</div>
              <div className="text-xs">({t('deliveryCharge')})</div>
            </Th>
            {/* time */}
            <Th searchParamsValue="paidAt">{t('time')}</Th>
            {/* actions */}
            <Th>{t('actions')}</Th>
          </TrHead>
        </thead>
        <tbody>
          {isLoading && <OrderSkeleton />}
          {!isLoading && <OrderList orders={displayOrders} />}
        </tbody>
      </table>
      {(!privateOrders || privateOrders.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItems')}</div>
      )}
      {privateOrders && privateOrders.length > 0 && (!displayOrders || displayOrders.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItemsMatchSearching')}</div>
      )}
      <ErrorTranslation error={error} />
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <PaginationIndicatorClient itemName={t('indicator')} itemsLength={privateOrders?.length} />
        <PaginationClient theme="primary" itemsLength={privateOrders?.length} />
      </div>
    </div>
  );
};

export default OrderTable;
