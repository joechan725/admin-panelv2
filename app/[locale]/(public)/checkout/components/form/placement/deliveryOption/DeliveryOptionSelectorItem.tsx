import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import { useLanguage } from '@/lib/hooks/language/useLanguage';
import { DeliveryOption } from '@/models/deliveryOption/DeliveryOption';
import { OrderPlacementSchema } from '@/schemas/order/orderPlacementSchema';
import clsx from 'clsx/lite';
import { useLocale, useTranslations } from 'next-intl';
import { UseFormSetValue } from 'react-hook-form';

interface DeliveryOptionSelectorItemProps {
  deliveryOption: DeliveryOption;
  selectedDeliveryOptionId?: string;
  setValue: UseFormSetValue<OrderPlacementSchema>;
}

const DeliveryOptionSelectorItem = ({
  deliveryOption,
  selectedDeliveryOptionId,
  setValue,
}: DeliveryOptionSelectorItemProps) => {
  const locale = useLocale();
  const { convertAddress } = useLanguage();
  const t = useTranslations('DeliveryOption.selector');

  const {
    nameZH,
    nameEN,
    descriptionZH,
    descriptionEN,
    deliveryProviderZH,
    deliveryProviderEN,
    estimatedTimeZH,
    estimatedTimeEN,
    deliveryCharge,
    freeDeliveryThreshold,
    isPickUp,
    id,
    storeAddressDetailAddress,
    storeAddressDistrict,
    storeAddressName,
    storeAddressPhoneNumber,
    storeAddressRegion,
    storeAddressBusinessHours,
  } = deliveryOption;

  const isSelected = selectedDeliveryOptionId === id;

  const handleClick = () => {
    setValue('deliveryOptionId', id);
    setValue('deliveryOptionNameZH', nameZH);
    setValue('deliveryOptionNameEN', nameEN);
    setValue(
      'deliveryOptionDescriptionZH',
      (descriptionZH ?? '') as OrderPlacementSchema['deliveryOptionDescriptionZH']
    );
    setValue(
      'deliveryOptionDescriptionEN',
      (descriptionEN ?? '') as OrderPlacementSchema['deliveryOptionDescriptionEN']
    );
    setValue('deliveryOptionDeliveryCharge', deliveryCharge ?? '');
    setValue(
      'deliveryOptionDeliveryProviderZH',
      (deliveryProviderZH ?? '') as OrderPlacementSchema['deliveryOptionDeliveryProviderZH']
    );
    setValue(
      'deliveryOptionDeliveryProviderEN',
      (deliveryProviderEN ?? '') as OrderPlacementSchema['deliveryOptionDeliveryProviderEN']
    );
    setValue('deliveryOptionEstimatedTimeZH', estimatedTime);
    setValue('deliveryOptionEstimatedTimeZH', estimatedTime);
    setValue(
      'deliveryOptionFreeDeliveryThreshold',
      (freeDeliveryThreshold ?? '') as OrderPlacementSchema['deliveryOptionFreeDeliveryThreshold']
    );
    setValue('isPickUp', isPickUp);
    if (isPickUp) {
      setValue('deliveryAddressId', '');
      setValue('addressRemark', '');
      setValue('deliveryDistrict', (storeAddressDistrict ?? '') as OrderPlacementSchema['deliveryDistrict']);
      setValue('deliveryRegion', (storeAddressRegion ?? '') as OrderPlacementSchema['deliveryRegion']);
      setValue(
        'deliveryDetailAddress',
        (storeAddressDetailAddress ?? '') as OrderPlacementSchema['deliveryDetailAddress']
      );
      setValue('storeName', (storeAddressName ?? '') as OrderPlacementSchema['storeName']);
      setValue('storePhoneNumber', (storeAddressPhoneNumber ?? '') as OrderPlacementSchema['storePhoneNumber']);
      setValue('storeBusinessHours', storeAddressBusinessHours ?? '');
    } else {
      setValue('storeName', '');
      setValue('storePhoneNumber', '');
      setValue('storeBusinessHours', '');
    }
  };

  const name = locale === 'en' ? nameEN : nameZH;
  const description = locale === 'en' ? descriptionEN : descriptionZH;
  const deliveryProvider = locale === 'en' ? deliveryProviderEN : deliveryProviderZH;
  const estimatedTime = locale === 'en' ? estimatedTimeEN : estimatedTimeZH;

  return (
    <div
      className={clsx(
        ' border-2 hover:border-secondary-bg rounded-md px-8 py-2',
        isSelected ? 'border-2 border-secondary-bg' : 'border-slate-500/20'
      )}
      role="button"
      onClick={handleClick}
    >
      <div className="text-sm font-semibold text-primary-text">
        {name}
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
            <span className="text-sm font-semibold text-primary-text">{t('businessHours')}</span>
            <span className="text-sm font-medium text-secondary-text">{storeAddressBusinessHours}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default DeliveryOptionSelectorItem;
