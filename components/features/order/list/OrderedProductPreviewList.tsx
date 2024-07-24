'use client';

import { OrderItem } from '@/models/order/OrderItem';
import { useState } from 'react';
import OrderedProductPreviewItem from './OrderedProductPreviewItem';
import { motion } from 'framer-motion';
import clsx from 'clsx/lite';
import { useTranslations } from 'next-intl';

interface OrderedProductPreviewListProps {
  orderItems: OrderItem[];
}

const OrderedProductPreviewList = ({ orderItems }: OrderedProductPreviewListProps) => {
  const t = useTranslations('Order.list');

  const [isViewMore, setIsViewMore] = useState(false);

  const isMoreThanThreeProducts = orderItems.length > 3;

  const toggleView = () => {
    if (isMoreThanThreeProducts) {
      setIsViewMore((prevBoolean) => !prevBoolean);
    }
  };

  return (
    <div className="p-2">
      <div className="space-y-1">
        <div className="space-y-1">
          {orderItems.slice(0, 3).map((orderItem) => (
            <OrderedProductPreviewItem orderItem={orderItem} />
          ))}
        </div>
        <motion.div
          animate={{ height: isViewMore ? 'auto' : 0 }}
          className={clsx(isViewMore ? 'h-full' : 'h-0 overflow-hidden')}
        >
          {orderItems.slice(3, orderItems.length).map((orderItem) => (
            <OrderedProductPreviewItem orderItem={orderItem} />
          ))}
        </motion.div>
      </div>
      {orderItems.length > 3 && (
        <div role="button" className="text-xs font-medium text-secondary-text" onClick={toggleView}>
          {isViewMore ? t('viewLess') : t('viewMore')}
        </div>
      )}
    </div>
  );
};

export default OrderedProductPreviewList;
