'use client';

import BarButton from '@/components/form/BarButton';
import { useState } from 'react';
import RefundByStripeForm from './RefundByStripeForm';
import { Order } from '@/models/order/Order';
import RefundByOtherMethodForm from './RefundByOtherMethodForm';
import { useTranslations } from 'next-intl';

interface SelectRefundMethodProps {
  orderId: string;
  order: Order;
  onSuccess?: () => void;
}

const SelectRefundMethod = ({ orderId, order, onSuccess }: SelectRefundMethodProps) => {
  const t = useTranslations('Order.refundForm');

  const [refundMethod, setRefundMethod] = useState<'stripe' | 'other' | undefined>(undefined);

  return (
    <>
      {refundMethod === undefined && (
        <div className="space-y-4">
          <div className="text-lg font-semibold text-primary-text">{t('title')}</div>
          <div className="space-y-2">
            <BarButton disabled={false} theme="stripe" type="button" onClick={() => setRefundMethod('stripe')}>
              {t('refundByStripe')}
            </BarButton>
            <div className="font-medium text-tertiary-text">{t('refundByStripeDescription')}</div>
            <BarButton disabled={false} theme="safe" type="button" onClick={() => setRefundMethod('other')}>
              {t('refundByOtherMethod')}
            </BarButton>
            <div className="font-medium text-tertiary-text">{t('refundByOtherMethodDescription')}</div>
          </div>
        </div>
      )}
      {refundMethod === 'stripe' && <RefundByStripeForm orderId={orderId} order={order} onSuccess={onSuccess} />}
      {refundMethod === 'other' && <RefundByOtherMethodForm orderId={orderId} order={order} onSuccess={onSuccess} />}
    </>
  );
};

export default SelectRefundMethod;
