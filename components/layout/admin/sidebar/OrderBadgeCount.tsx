'use client';

import { useOrderAggregatorListener } from '@/lib/hooks/admin/useOrderAggregatorListener';
import BadgeCount from '../../../BadgeCount';

interface OrderBadgeCountProps {}

const OrderBadgeCount = ({}: OrderBadgeCountProps) => {
  const { orderAggregator } = useOrderAggregatorListener();
  if (!orderAggregator) {
    return;
  }
  const { notDeliveredOrderCount } = orderAggregator;

  return <BadgeCount badgeCount={notDeliveredOrderCount} maxBadgeCount={99} />;
};

export default OrderBadgeCount;
