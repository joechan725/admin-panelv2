'use client';

import Th from '@/components/table/Th';
import PaginationClient from '@/components/search/PaginationClient';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import CouponSkeleton from './CouponSkeleton';
import CouponList from './CouponList';
import { PrivateCoupon } from '@/models/coupon/PrivateCoupon';
import { useTranslations } from 'next-intl';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface CouponTableProps {
  onSelect?: (id: string) => void;
  selectedCouponIds?: string[];
  isLoading: boolean;
  displayCoupons: PrivateCoupon[];
  privateCoupons: PrivateCoupon[];
  error?: string;
}
const CouponTable = ({
  onSelect,
  selectedCouponIds,
  isLoading,
  displayCoupons,
  privateCoupons,
  error,
}: CouponTableProps) => {
  const t = useTranslations('Coupon.list');

  return (
    <div className="mb-4 relative">
      {isLoading && <LoadingShimmer gradient="gray" roundedClassName="rounded-none" />}
      <table className="w-full">
        <thead>
          <tr className="border-y border-slate-900/10 bg-gray-50/50">
            {onSelect && <th></th>}
            <Th searchParamsValue="code">{t('code')}</Th>
            <Th searchParamsValue="discount-type">
              <div>{t('discountType')}</div>
              <div>{t('amount')}</div>
            </Th>
            <Th searchParamsValue="minimum-spend">
              <div className="max-w-16">{t('minimumSpend')}</div>
            </Th>
            <Th searchParamsValue="usage-limit">
              <div>{t('limit')}</div>
            </Th>
            <Th searchParamsValue="usage-limit-per-user">
              <div className="max-w-16">{t('limitPerUser')}</div>
            </Th>
            <Th searchParamsValue="usage-count">
              <div className="max-w-16">{t('usedCount')}</div>
            </Th>
            <Th searchParamsValue="accumulative-discount-amount">
              <div className="max-w-24">{t('accumulativeDiscountAmount')}</div>
            </Th>
            <Th searchParamsValue="effective-time">
              <div>{t('effectiveTime')}</div>
            </Th>
            <Th searchParamsValue="updated-at">{t('editTime')}</Th>
            <Th searchParamsValue="registered-user-only">
              <div className="max-w-20">{t('registeredUserOnly')}</div>
            </Th>
            <Th searchParamsValue="can-be-used-together">
              <div className="max-w-24">{t('canBeUsedTogether')}</div>
            </Th>
            <Th searchParamsValue="is-public">{t('published')}</Th>
            <Th>{t('actions')}</Th>
          </tr>
        </thead>
        {isLoading && <CouponSkeleton />}
        {!isLoading && (
          <tbody>
            <CouponList coupons={displayCoupons} onSelect={onSelect} selectedCouponIds={selectedCouponIds} />
          </tbody>
        )}
      </table>
      {!isLoading && (!privateCoupons || privateCoupons.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItems')}</div>
      )}
      {privateCoupons && privateCoupons.length > 0 && (!displayCoupons || displayCoupons.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItemsMatchSearching')}</div>
      )}
      {error && <ErrorTranslation error={error} />}
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <PaginationIndicatorClient itemName={t('itemName')} itemsLength={privateCoupons?.length} />
        <PaginationClient theme="primary" itemsLength={privateCoupons?.length} />
      </div>
    </div>
  );
};
export default CouponTable;
