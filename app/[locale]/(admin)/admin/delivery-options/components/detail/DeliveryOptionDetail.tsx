'use client';

import PrintContainer from '@/components/search/PrintContainer';
import { PrivateDeliveryOption } from '@/models/deliveryOption/PrivateDeliveryOption';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import LoadUsageRecords from './LoadUsageRecords';
import { useLocale, useTranslations } from 'next-intl';

interface DeliveryOptionDetailProps {
  privateDeliveryOption: PrivateDeliveryOption;
}

const DeliveryOptionDetail = ({ privateDeliveryOption }: DeliveryOptionDetailProps) => {
  const t = useTranslations('DeliveryOption.detail');
  const locale = useLocale();

  const {
    nameZH,
    nameEN,
    isPickUp,
    descriptionZH,
    descriptionEN,
    deliveryCharge,
    estimatedTimeZH,
    estimatedTimeEN,
    deliveryProviderZH,
    deliveryProviderEN,
    freeDeliveryThreshold,
    usageCount,
    accumulativeDeliveryCharge,
  } = privateDeliveryOption;

  const name = locale === 'en' ? nameEN : nameZH;
  const description = locale === 'en' ? descriptionEN : descriptionZH;
  const deliveryProvider = locale === 'en' ? deliveryProviderEN : deliveryProviderZH;
  const estimatedTime = locale === 'en' ? estimatedTimeEN : estimatedTimeZH;

  return (
    <div className="m-12">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-primary-text">{t('title')}</div>
      </div>
      <div className="ml-6 mb-2">
        <div>
          <span className="font-semibold text-primary-text">{t('name')}</span>
          <span className="font-medium text-secondary-text"> {name}</span>
        </div>
        <div>
          <span className="font-semibold text-primary-text">{t('description')}</span>
          <span className="font-medium text-secondary-text"> {splitNewLine(description) ?? 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold text-primary-text">{t('deliveryCharge')}</span>
          <span className="font-medium text-secondary-text">
            {' '}
            {deliveryCharge ? `$${deliveryCharge.toFixed(2)}` : t('free')}
          </span>
        </div>
        <div>
          <span className="font-semibold text-primary-text">
            {isPickUp ? t('estimatedPrepareTime') : t('estimatedDeliveryTime')}
          </span>
          <span className="font-medium text-secondary-text">{estimatedTime ?? 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold text-primary-text">{t('deliveryProvider')}</span>
          <span className="font-medium text-secondary-text">{deliveryProvider ?? 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold text-primary-text">{t('freeDeliveryThreshold')}</span>
          <span className="font-medium text-secondary-text">
            {freeDeliveryThreshold ? `$${freeDeliveryThreshold.toFixed(2)}` : 'N/A'}
          </span>
        </div>
      </div>
      <div className="text-lg font-semibold text-primary-text">{t('usageRecords')}</div>
      <div className="ml-6">
        <div>
          <span className="font-semibold text-primary-text">{t('usageCount')}</span>
          <span className="font-medium text-secondary-text"> {usageCount ?? 0}</span>
        </div>
        <div>
          <span className="font-semibold text-primary-text">{t('accumulativeDeliveryCharge')}</span>
          <span className="font-medium text-secondary-text"> ${(accumulativeDeliveryCharge ?? 0).toFixed(2)}</span>
        </div>
      </div>
      <PrintContainer
        heading={<SearchQueryBarSuspense fontSize="sm" sizeClassName="max-w-72" searchParamsKey="q" />}
        fontSize="sm"
      >
        <LoadUsageRecords />
      </PrintContainer>
    </div>
  );
};
export default DeliveryOptionDetail;
