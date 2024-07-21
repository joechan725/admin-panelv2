'use client';

import clsx from 'clsx/lite';
import PrintContainer from '@/components/search/PrintContainer';
import { PrivateCoupon } from '@/models/coupon/PrivateCoupon';
import { capitalizeFirstLetterOfEachWord } from '@/lib/helpers/string/capitalizeFirstLetterOfEachWord';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import LoadUsageRecords from './LoadUsageRecords';
import { useTranslations } from 'next-intl';

interface CouponDetailProps {
  privateCoupon: PrivateCoupon;
}
const CouponDetail = ({ privateCoupon }: CouponDetailProps) => {
  const t = useTranslations('Coupon.detail');

  const { id, code, discountType, discountAmount, maximumDiscount, accumulativeDiscountAmount, usageCount } =
    privateCoupon;

  return (
    <div className="m-12">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-primary-text">{t('title')}</div>
      </div>
      <div className="ml-6 mb-2">
        <div>
          <span className="font-semibold text-primary-text">{t('code')}</span>
          <span className="font-medium text-secondary-text">{code}</span>
        </div>
        <div>
          <span className="font-semibold text-primary-text">{t('discountTypeAndAmount')}</span>
          <span
            className={clsx(
              'text-sm py-0.5 px-1 rounded-md max-w-min',
              discountType === 'fixed' && 'bg-purple-500/15 text-purple-500',
              discountType === 'percentage' && 'bg-blue-500/15 text-blue-500'
            )}
          >
            {discountType === 'fixed' && t('fixed')}
            {discountType === 'percentage' && t('percentage')}
          </span>
          <span className="font-medium text-secondary-text">
            {discountType === 'fixed' && '$'}
            {discountAmount.toFixed(2)}
            {discountType === 'percentage' && '% off'}
          </span>
          {maximumDiscount !== undefined && (
            <div className="text-sm font-medium text-tertiary-text">
              ({t('maximumDiscount')}${maximumDiscount.toFixed(2)})
            </div>
          )}
        </div>
      </div>
      <div className="text-lg font-semibold text-gray-600">{t('usageRecords')}</div>
      <div className="ml-6">
        <div>
          <span className="font-semibold text-primary-text">{t('usageCount')}</span>
          <span className="font-medium text-secondary-text">{usageCount ?? 0}</span>
        </div>
        <div>
          <span className="font-semibold text-primary-text">{t('accumulativeDiscountAmount')}</span>
          <span className="font-medium text-secondary-text">${(accumulativeDiscountAmount ?? 0).toFixed(2)}</span>
        </div>
      </div>
      <PrintContainer
        fontSize="sm"
        heading={<SearchQueryBarSuspense fontSize="sm" sizeClassName="max-w-72" searchParamsKey="q" />}
      >
        <LoadUsageRecords />
      </PrintContainer>
    </div>
  );
};
export default CouponDetail;
