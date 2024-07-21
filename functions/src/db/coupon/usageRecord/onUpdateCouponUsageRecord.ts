import * as functions from 'firebase-functions';
import { CouponUsageRecordData } from '../../../models/coupon/usageRecord/CouponUsageRecordData';
import { updateCouponUsageRecordList } from './helpers/updateCouponUsageRecordList';

export const onUpdateCouponUsageRecord = functions.firestore
  .document('coupons/{couponId}/usageRecords/{couponUsageRecordId}')
  .onUpdate(async (change, context) => {
    const { couponId, couponUsageRecordId } = context.params;
    // get data after changes
    const couponUsageRecordSnapBefore = change.before;
    const couponUsageRecordSnapAfter = change.after;

    const couponUsageRecordDataAfter = couponUsageRecordSnapAfter.data() as CouponUsageRecordData;
    const couponUsageRecordDataBefore = couponUsageRecordSnapBefore.data() as CouponUsageRecordData;

    if (couponUsageRecordDataAfter.deletedAt === undefined) {
      // The record is update
      await updateCouponUsageRecordList({
        couponId,
        couponUsageRecordId,
        couponUsageRecordDataAfter,
        couponUsageRecordDataBefore,
        mode: 'update',
      });
    }

    if (couponUsageRecordDataAfter.deletedAt !== undefined) {
      // The record is deleted
      await updateCouponUsageRecordList({
        couponId,
        couponUsageRecordId,
        couponUsageRecordDataBefore,
        mode: 'delete',
      });
    }
  });
