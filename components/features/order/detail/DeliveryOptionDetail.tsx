import { useTranslations } from 'next-intl';

interface DeliveryOptionDetailProps {
  isPickUp: boolean;
  name: string;
  description?: string;
  deliveryCharge: number;
  estimatedTime?: string;
  freeDeliveryThreshold?: number;
  deliveryProvider?: string;
  deliveryChargeAtThisOrder?: number;
}

const DeliveryOptionDetail = ({
  isPickUp,
  name,
  description,
  deliveryCharge,
  estimatedTime,
  freeDeliveryThreshold,
  deliveryProvider,
  deliveryChargeAtThisOrder,
}: DeliveryOptionDetailProps) => {
  const t = useTranslations('DeliveryOption.review');

  return (
    <div className="space-y-5">
      <div className="font-semibold text-primary-text">{t('deliveryOption')}</div>
      <div>
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
            <span className="text-sm font-medium text-secondary-text">${deliveryChargeAtThisOrder.toFixed(2)} </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryOptionDetail;
