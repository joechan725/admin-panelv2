import * as functions from 'firebase-functions';
import { updateCouponList } from './helpers/updateCouponList';
import { updateCouponCount } from './helpers/updateCouponCount';
import { removeFieldsFormObject } from '../../lib/helpers/object/removeFieldsFormObject';
import { PrivateCouponData } from '../../models/coupon/PrivateCouponData';
import { CouponData as PublicCouponData } from '../../models/coupon/CouponData';
import { addDeletedCoupon } from './helpers/addDeletedCoupon';

export const onUpdateCoupon = functions.firestore.document('coupons/{couponId}').onUpdate(async (change, context) => {
  const { couponId } = context.params;
  // get data after changes
  const couponSnapBefore = change.before;
  const couponSnapAfter = change.after;

  const privateCouponDataBefore = couponSnapBefore.data() as PrivateCouponData;
  const privateCouponDataAfter = couponSnapAfter.data() as PrivateCouponData;

  const publicCouponDataAfter: PublicCouponData = removeFieldsFormObject(privateCouponDataAfter, [
    'usageCount',
    'accumulativeDiscountAmount',
  ]);
  const publicCouponDataBefore: PublicCouponData = removeFieldsFormObject(privateCouponDataBefore, [
    'usageCount',
    'accumulativeDiscountAmount',
  ]);

  if (privateCouponDataAfter.deletedAt === undefined) {
    // The coupon is update
    await updateCouponList({
      couponId,
      privateCouponDataBefore,
      publicCouponDataBefore,
      privateCouponDataAfter,
      publicCouponDataAfter,
      mode: 'update',
    });

    if (!privateCouponDataBefore.isPublic && privateCouponDataAfter.isPublic) {
      await updateCouponCount({ mode: 'change-to-public' });
    }

    if (privateCouponDataBefore.isPublic && !privateCouponDataAfter.isPublic) {
      await updateCouponCount({ mode: 'change-to-private' });
    }
  }

  if (privateCouponDataBefore.deletedAt === undefined && privateCouponDataAfter.deletedAt !== undefined) {
    // The coupon is deleted
    await updateCouponList({
      couponId,
      publicCouponDataBefore,
      privateCouponDataBefore,
      mode: 'delete',
    });

    if (privateCouponDataAfter.isPublic) {
      await updateCouponCount({ mode: 'delete-public' });
    }
    if (!privateCouponDataAfter.isPublic) {
      await updateCouponCount({ mode: 'delete-private' });
    }

    await addDeletedCoupon({ couponId, couponData: privateCouponDataAfter });
  }
});
