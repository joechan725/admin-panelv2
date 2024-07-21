'use client';

import { usePrivateCouponListsListener } from '@/lib/hooks/coupon/usePrivateCouponListsListener';
import { useSearchParams } from 'next/navigation';
import CouponTable from './CouponTable';
import { searchAndOrderCoupons } from './searchAndOrderCoupons';

interface LoadCouponsProps {
  onSelect?: (id: string) => void;
  selectedCouponIds?: string[];
}
const LoadCoupons = ({ onSelect, selectedCouponIds }: LoadCouponsProps) => {
  const { privateCoupons, isLoading, error } = usePrivateCouponListsListener();
  const searchParams = useSearchParams();
  const displayCoupons = searchAndOrderCoupons({ searchParams, privateCoupons });

  return (
    <CouponTable
      onSelect={onSelect}
      selectedCouponIds={selectedCouponIds}
      displayCoupons={displayCoupons}
      privateCoupons={privateCoupons}
      isLoading={isLoading}
      error={error}
    />
  );
};
export default LoadCoupons;
