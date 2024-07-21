import { CouponUsed } from '@/models/coupon/CouponUsed';
import { useTranslations } from 'next-intl';

interface CouponReviewProps {
  couponsUsed?: CouponUsedData[];
  discountAmount?: number;
}

interface CouponUsedData extends Omit<CouponUsed, 'updatedAt' | 'createdAt' | 'startDate' | 'endDate'> {}

const CouponReview = ({ couponsUsed, discountAmount }: CouponReviewProps) => {
  const t = useTranslations('Coupon.review');

  if (!couponsUsed || couponsUsed.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="font-semibold text-primary-text">{t('coupons')}</div>
        <div className="space-y-1">
          {couponsUsed.map((couponUsed) => {
            const { code, discountAmountAtThisOrder } = couponUsed;
            return (
              <div className="pl-2 flex justify-between">
                <div className="text-sm font-semibold text-primary-text">{code}</div>
                <div className="text-sm font-medium text-secondary-text">
                  - ${(discountAmountAtThisOrder ?? 0).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
        <hr className="h-0.5 w-full bg-slate-600/20" />
        <div className="flex justify-between">
          <div className="text-sm font-semibold text-primary-text">{t('couponDiscount')}</div>
          <div className="font-medium text-secondary-text">- ${(discountAmount ?? 0).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default CouponReview;
