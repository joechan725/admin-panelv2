import { useTranslations } from 'next-intl';

interface DeliveryOptionReviewProps {
  isPickUp: boolean;
  name: string;
  description?: string;
  deliveryCharge: number;
  estimatedTime: string;
  freeDeliveryThreshold?: number;
  deliveryProvider?: string;
  deliveryChargeAtThisOrder?: number;
}

const DeliveryOptionReview = ({
  isPickUp,
  name,
  description,
  deliveryCharge,
  estimatedTime,
  freeDeliveryThreshold,
  deliveryProvider,
  deliveryChargeAtThisOrder,
}: DeliveryOptionReviewProps) => {
  const t = useTranslations('DeliveryOption.review');

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="font-semibold text-primary-text">{t('deliveryOption')}</div>
        <div className="space-y-1">
          <div className="text-sm font-semibold text-gray-500">{t('deliveryOptionConfirmation')}</div>
          <div className="border-2 rounded-md px-8 py-2 border-slate-500/20">
            <div className="text-sm font-semibold text-primary-text">{name}</div>
            <div className="text-sm font-medium text-secondary-text">{description}</div>
            {!isPickUp && deliveryProvider && (
              <div>
                <span className="text-sm font-semibold text-primary-text">{t('deliveryProvider')}</span>
                <span className="text-sm font-medium text-secondary-text">{deliveryProvider}</span>
              </div>
            )}
            {estimatedTime && (
              <div>
                <span className="text-sm font-semibold text-primary-text">
                  {isPickUp ? t('estimatedPrepareTime') : t('estimatedDeliveryTime')}
                </span>
                <span className="text-sm font-medium text-secondary-text">{estimatedTime}</span>
              </div>
            )}
            <div>
              <span className="text-sm font-semibold text-primary-text">{t('deliveryCharge')}</span>
              <span className="text-sm font-medium text-secondary-text">
                {deliveryCharge === 0 && t('free')}
                {deliveryCharge > 0 && (
                  <span>
                    ${deliveryCharge.toFixed(2)}{' '}
                    {freeDeliveryThreshold !== undefined &&
                      t('freeDeliveryThreshold', { freeDeliveryThreshold: freeDeliveryThreshold.toFixed(2) })}
                  </span>
                )}
              </span>
            </div>
            {deliveryChargeAtThisOrder !== undefined && (
              <div>
                <span className="text-sm font-semibold text-primary-text">{t('deliveryChargeAtThisOrder')}</span>
                <span className="text-sm font-medium text-secondary-text">${deliveryChargeAtThisOrder.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptionReview;
