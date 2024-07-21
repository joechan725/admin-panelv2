'use client';

import { usePrivateCouponListener } from '@/lib/hooks/coupon/usePrivateCouponListener';
import { notFound, useParams } from 'next/navigation';
import CouponDetail from './CouponDetail';
import LoadingSpin from '@/components/loading/LoadingSpin';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface LoadCouponDetailProps {}
const LoadCouponDetail = ({}: LoadCouponDetailProps) => {
  const params = useParams<{ couponId: string }>();

  const couponId = params.couponId;

  const { privateCoupon, error, isLoading } = usePrivateCouponListener(couponId);

  if (!isLoading && !error && !privateCoupon) {
    notFound();
  }

  return (
    <>
      {isLoading && <LoadingSpin layout="global" theme="secondary" />}
      {!isLoading && privateCoupon && <CouponDetail privateCoupon={privateCoupon} />}
      {!isLoading && error && <ErrorTranslation error={error} />}
    </>
  );
};
export default LoadCouponDetail;
