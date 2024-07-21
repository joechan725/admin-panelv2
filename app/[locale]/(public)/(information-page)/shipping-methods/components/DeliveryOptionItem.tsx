import { formatPhoneNumber } from '@/lib/helpers/string/formatPhoneNumber';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import { useLanguage } from '@/lib/hooks/language/useLanguage';
import { DeliveryOption } from '@/models/deliveryOption/DeliveryOption';
import { useTranslations } from 'next-intl';

interface DeliveryOptionItemProps {
  deliveryOption: DeliveryOption;
}

const DeliveryOptionItem = ({ deliveryOption }: DeliveryOptionItemProps) => {
  const t = useTranslations('DeliveryOption.page');
  const { locale, convertAddress } = useLanguage();

  const {
    nameEN,
    nameZH,
    descriptionEN,
    descriptionZH,
    deliveryProviderEN,
    deliveryProviderZH,
    estimatedTimeEN,
    estimatedTimeZH,
    isPickUp,
    deliveryCharge,
    freeDeliveryThreshold,
    storeAddressBusinessHours,
    storeAddressDetailAddress,
    storeAddressDistrict,
    storeAddressPhoneNumber,
    storeAddressRegion,
  } = deliveryOption;

  const name = locale === 'en' ? nameEN : nameZH;
  const description = locale === 'en' ? descriptionEN : descriptionZH;
  const deliveryProvider = locale === 'en' ? deliveryProviderEN : deliveryProviderZH;
  const estimatedTime = locale === 'en' ? estimatedTimeEN : estimatedTimeZH;

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-primary-text">{name}</span>
        {isPickUp && (
          <span className="text-xs py-0.5 px-1 rounded-md font-medium bg-success/20 text-success">
            {t('pickupAtStore')}
          </span>
        )}
      </div>
      <div className="text-sm font-medium text-secondary-text line-clamp-3 text-ellipsis">
        {splitNewLine(description)}
      </div>
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
                t('freeDelivery', { freeDeliveryThreshold: freeDeliveryThreshold.toFixed(2) })}
            </span>
          )}
        </span>
      </div>
      {isPickUp && (
        <>
          <div>
            <span className="text-sm font-semibold text-primary-text">{t('pickupAddress')}</span>
            <span className="text-sm font-medium text-secondary-text">
              {convertAddress({
                detailAddress: storeAddressDetailAddress,
                district: storeAddressDistrict,
                region: storeAddressRegion,
              })}
            </span>
          </div>
          <div>
            <span className="text-sm font-semibold text-primary-text">{t('phoneNumber')}</span>
            <span className="text-sm font-medium text-secondary-text">
              {formatPhoneNumber(storeAddressPhoneNumber)}
            </span>
          </div>
          <div>
            <span className="text-sm font-semibold text-primary-text">{t('businessHours')}</span>
            <span className="text-sm font-medium text-secondary-text">{storeAddressBusinessHours}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default DeliveryOptionItem;
