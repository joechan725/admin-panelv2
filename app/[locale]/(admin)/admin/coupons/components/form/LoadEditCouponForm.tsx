'use client';

import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCoupon } from '@/lib/hooks/coupon/useCoupon';
import EditCouponForm from './EditCouponForm';
import LoadingSpin from '@/components/loading/LoadingSpin';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface LoadEditCouponFormProps {
  onSuccess?: () => void;
}

const LoadEditCouponForm = ({ onSuccess }: LoadEditCouponFormProps) => {
  const params = useParams();

  const couponId = params.couponId;

  const { loadCoupon, coupon, isLoading, error } = useCoupon();
  useEffect(() => {
    if (!couponId || typeof couponId !== 'string') {
      return;
    }
    loadCoupon({ couponId });
  }, [couponId]);

  if (!isLoading && !coupon) {
    notFound();
  }

  return (
    <div>
      {isLoading && <LoadingSpin theme="secondary" layout="global" />}
      {!isLoading && coupon && <EditCouponForm onSuccess={onSuccess} coupon={coupon} />}
      {!isLoading && error && <ErrorTranslation error={error} />}
    </div>
  );
};

export default LoadEditCouponForm;
