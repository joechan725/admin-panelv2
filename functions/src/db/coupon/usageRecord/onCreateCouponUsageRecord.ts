import * as functions from 'firebase-functions';
import { CouponUsageRecordData } from '../../../models/coupon/usageRecord/CouponUsageRecordData';
import { updateCouponUsageRecordList } from './helpers/updateCouponUsageRecordList';

export const onCreateCouponUsageRecord = functions.firestore
  .document('coupons/{couponId}/usageRecords/{couponUsageRecordId}')
  .onCreate(async (snapshot, context) => {
    const { couponId, couponUsageRecordId } = context.params;
    const couponUsageRecordData = snapshot.data() as CouponUsageRecordData;

    await updateCouponUsageRecordList({
      couponId,
      couponUsageRecordId,
      couponUsageRecordDataAfter: couponUsageRecordData,
      mode: 'create',
    });
  });
