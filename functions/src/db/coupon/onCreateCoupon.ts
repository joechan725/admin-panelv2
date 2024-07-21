import * as functions from 'firebase-functions';
import { updateCouponList } from './helpers/updateCouponList';
import { updateCouponCount } from './helpers/updateCouponCount';
import { removeFieldsFormObject } from '../../lib/helpers/object/removeFieldsFormObject';
import { PrivateCouponData } from '../../models/coupon/PrivateCouponData';
import { CouponData as PublicCouponData } from '../../models/coupon/CouponData';

export const onCreateCoupon = functions.firestore.document('coupons/{couponId}').onCreate(async (snapshot, context) => {
  const { couponId } = context.params;
  const privateCouponData = snapshot.data() as PrivateCouponData;
  const publicCouponData: PublicCouponData = removeFieldsFormObject(privateCouponData, [
    'usageCount',
    'accumulativeDiscountAmount',
  ]);

  await updateCouponList({
    couponId,
    publicCouponDataAfter: publicCouponData,
    privateCouponDataAfter: privateCouponData,
    mode: 'create',
  });

  if (privateCouponData.isPublic) {
    await updateCouponCount({ mode: 'create-public' });
  }
  if (!privateCouponData.isPublic) {
    await updateCouponCount({ mode: 'create-private' });
  }
});
