import { FieldValue } from 'firebase-admin/firestore';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { User } from '../../../models/user/User';
import { OrderData } from '../../../models/order/OrderData';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateUserOrderRecordParameters {
  orderData: OrderData;
  mode: 'paid' | 'update' | 'delete';
}

/**
 * Update the totalSpent and orderCount in the user document
 *
 * @param order - The order data
 * @param mode - 'paid' | 'update' | 'delete';
 * @returns The promise of void
 */

export const updateUserOrderRecord = async ({ orderData, mode }: UpdateUserOrderRecordParameters) => {
  try {
    // update the totalSpent and orderCount in the user document
    const userRef = db.collection('users').doc(orderData.userId);

    if (mode === 'paid') {
      const updatedUser: ExtendWithFieldValue<Partial<User>> = {
        totalSpent: FieldValue.increment(orderData.totalPriceAfterDiscount),
        orderCount: FieldValue.increment(1),
        totalDiscountAmount: FieldValue.increment(orderData.discountAmount ?? 0),
        couponUsedCount: FieldValue.increment(orderData.couponsUsed.length),
      };
      await userRef.update(updatedUser);
    }

    if (mode === 'delete') {
      const updatedUser: ExtendWithFieldValue<Partial<User>> = {
        totalSpent: FieldValue.increment(-orderData.totalPriceAfterDiscount),
        orderCount: FieldValue.increment(-1),
        totalDiscountAmount: FieldValue.increment(-orderData.couponsUsed.length),
      };
      await userRef.update(updatedUser);
    }
  } catch (error) {
    logger.error('Error on user order record', error);
  }
};
