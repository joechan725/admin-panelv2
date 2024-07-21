'use client';

import Cube from '@/components/icon/Cube';
import Document from '@/components/icon/Document';
import Tick from '@/components/icon/Tick';
import Trunk from '@/components/icon/Trunk';
import { useOrderAggregatorListener } from '@/lib/hooks/admin/useOrderAggregatorListener';
import { useTranslations } from 'next-intl';

interface OrderSummaryProps {}

const OrderSummary = ({}: OrderSummaryProps) => {
  const t = useTranslations('Order.summary');

  const { orderAggregator, isLoading, error } = useOrderAggregatorListener();

  return (
    <div className="grid grid-cols-4 divide-x divide-black/20">
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{orderAggregator?.notDeliveredOrderCount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('pendingOrders')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <Cube className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{orderAggregator?.deliveringOrderCount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('deliveringOrders')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <Trunk className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{orderAggregator?.arrivedOrderCount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('completedOrders')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <Tick className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{orderAggregator?.totalOrderCount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('totalOrders')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <Document className="text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
