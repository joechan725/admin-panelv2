import { CouponUsed } from '../../models/coupon/CouponUsed';
import { StatusHistory } from '../../models/order/StatusHistory';
import { Order } from '../../models/order/Order';
import { OrderData } from '../../models/order/OrderData';

interface ConvertOrderDataParameters {
  orderData: OrderData;
  orderId: string;
}

export const convertOrderData = ({ orderData, orderId }: ConvertOrderDataParameters): Order => {
  const statusHistories = orderData.statusHistories.map(
    (historyData): StatusHistory => ({
      ...historyData,
      createdAt: historyData.createdAt.toMillis(),
      updatedAt: historyData.updatedAt.toMillis(),
    })
  );

  const couponsUsed = orderData.couponsUsed.map(
    (couponUsedData): CouponUsed => ({
      ...couponUsedData,
      createdAt: couponUsedData.createdAt.toMillis(),
      updatedAt: couponUsedData.updatedAt.toMillis(),
      startDate: couponUsedData.startDate?.toMillis(),
      endDate: couponUsedData.endDate?.toMillis(),
    })
  );

  const order: Order = {
    ...orderData,
    id: orderId,
    statusHistories,
    couponsUsed,
    createdAt: orderData.createdAt.toMillis(),
    updatedAt: orderData.updatedAt.toMillis(),
    paidAt: orderData.paidAt?.toMillis(),
  };

  return order;
};
