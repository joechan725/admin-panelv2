import { useTranslations } from 'next-intl';

interface PriceReviewProps {
  discountAmount?: number;
  totalPriceBeforeDiscount?: number;
  amountToPay?: number;
  deliveryChargeAtThisOrder?: number;
}

const PriceReview = ({
  discountAmount,
  totalPriceBeforeDiscount,
  amountToPay,
  deliveryChargeAtThisOrder,
}: PriceReviewProps) => {
  const t = useTranslations('Order.priceReview');

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="font-semibold text-primary-text">{t('price')}</div>
        <div className="flex justify-between">
          <div className="text-sm font-semibold text-primary-text">{t('cartTotal')}</div>
          <div className="text-sm font-medium text-secondary-text">${(totalPriceBeforeDiscount ?? 0).toFixed(2)}</div>
        </div>
        {discountAmount !== undefined && discountAmount !== 0 && (
          <div className="flex justify-between">
            <div className="text-sm font-semibold text-primary-text">{t('couponDiscount')}</div>
            <div className="text-sm font-medium text-secondary-text">-${(discountAmount ?? 0).toFixed(2)}</div>
          </div>
        )}
        <div className="flex justify-between">
          <div className="text-sm font-semibold text-primary-text">{t('deliveryCharge')}</div>
          <div className="text-sm font-medium text-secondary-text">
            {deliveryChargeAtThisOrder ? `$${deliveryChargeAtThisOrder.toFixed(2)}` : t('free')}
          </div>
        </div>
      </div>
      <hr className="h-0.5 w-full bg-slate-600/20" />
      <div className="flex justify-between">
        <div className="font-semibold text-sm text-primary-text">{t('total')}</div>
        <div className="font-medium text-secondary-text">${(amountToPay ?? 0).toFixed(2)}</div>
      </div>
    </div>
  );
};

export default PriceReview;
