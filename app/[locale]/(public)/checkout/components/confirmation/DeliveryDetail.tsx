'use client';

import Box from '@/components/icon/Box';
import Trunk from '@/components/icon/Trunk';
import { useLanguage } from '@/lib/hooks/language/useLanguage';
import { Order } from '@/models/order/Order';
import { useTranslations } from 'next-intl';

interface DeliveryDetailProps {
  order: Order;
}

const DeliveryDetail = ({ order }: DeliveryDetailProps) => {
  const t = useTranslations('Order.confirmation');
  const { convertRegion, convertDistrict, locale } = useLanguage();

  const {
    contactName,
    deliveryDetailAddress,
    deliveryDistrict,
    deliveryRegion,
    isPickUp,
    contactPhoneNumber,
    deliveryOptionNameZH,
    deliveryOptionNameEN,
    deliveryOptionDescriptionZH,
    deliveryOptionDescriptionEN,
    deliveryOptionDeliveryProviderZH,
    deliveryOptionDeliveryProviderEN,
    deliveryOptionEstimatedTimeZH,
    deliveryOptionEstimatedTimeEN,
    deliveryOptionDeliveryCharge,
    deliveryOptionFreeDeliveryThreshold,
    deliveryChargeAtThisOrder,
  } = order;

  const deliveryOptionName = locale === 'en' ? deliveryOptionNameEN : deliveryOptionNameZH;
  const deliveryOptionDescription = locale === 'en' ? deliveryOptionDescriptionEN : deliveryOptionDescriptionZH;
  const deliveryOptionDeliveryProvider =
    locale === 'en' ? deliveryOptionDeliveryProviderEN : deliveryOptionDeliveryProviderZH;
  const deliveryOptionEstimatedTime = locale === 'en' ? deliveryOptionEstimatedTimeEN : deliveryOptionEstimatedTimeZH;

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:divide-x md:divide-y-0 divide-y divide-slate-600/20">
      {/* Delivery address */}
      <div className="space-y-5 px-8 py-6">
        <div className="flex gap-2 items-center">
          <Box sizeClassName="size-4" className="font-semibold text-primary-text" />
          <div className="text-sm font-semibold text-primary-text">
            {isPickUp ? t('pickupAddress') : t('deliveryAddress')}
          </div>
          {isPickUp && (
            <span className="text-xs py-0.5 px-1 rounded-md font-medium bg-success/20 text-success">
              {t('pickupAtStore')}
            </span>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold text-primary-text">{contactName}</div>
          <div>
            <span className="text-sm font-semibold text-primary-text">{t('contactPhoneNumber')}</span>
            <span className="text-sm font-medium text-secondary-text">{contactPhoneNumber}</span>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-primary-text">
            {isPickUp ? t('pickupAddress') : t('deliveryAddress')}
          </div>
          {locale === 'en' ? (
            <>
              <div className="text-sm font-medium text-secondary-text">{deliveryDetailAddress},</div>
              <div className="text-sm font-medium text-secondary-text">{convertDistrict(deliveryDistrict)},</div>
              <div className="text-sm font-medium text-secondary-text">{convertRegion(deliveryRegion)}</div>
            </>
          ) : (
            <>
              <div className="text-sm font-medium text-secondary-text">{convertRegion(deliveryRegion)}</div>
              <div className="text-sm font-medium text-secondary-text">{convertDistrict(deliveryDistrict)}</div>
              <div className="text-sm font-medium text-secondary-text">{deliveryDetailAddress}</div>
            </>
          )}
        </div>
      </div>
      {/* Shipping Method */}
      <div className="space-y-5 px-8 py-6">
        <div className="flex gap-2 items-center">
          <Trunk sizeClassName="size-4" className="font-semibold text-primary-text" />
          <div className="text-sm font-semibold text-primary-text">{t('deliveryOption')}</div>
        </div>
        <div>
          <div className="text-sm font-semibold text-primary-text">{deliveryOptionName}</div>
          {deliveryOptionDescription !== undefined && (
            <div className="text-sm font-medium text-secondary-text line-clamp-2 text-ellipsis">
              {deliveryOptionDescription}
            </div>
          )}
          {deliveryOptionDeliveryProvider !== undefined && (
            <div>
              <span className="text-sm font-semibold text-primary-text">{t('deliveryProvider')}</span>
              <span className="text-sm font-medium text-secondary-text"> {deliveryOptionDeliveryProvider}</span>
            </div>
          )}
          {deliveryOptionEstimatedTime !== undefined && (
            <div className="text-sm font-medium text-secondary-text">
              <span className="text-sm font-semibold text-primary-text">
                {isPickUp ? t('estimatedPrepareTime') : t('estimatedDeliveryTime')}
              </span>
              <span className="text-sm font-medium text-secondary-text"> {deliveryOptionEstimatedTime}</span>
            </div>
          )}
        </div>
        <div>
          {deliveryOptionDeliveryCharge === 0 && (
            <div className="text-sm font-semibold text-primary-text">{t('freeDelivery')}</div>
          )}
          {deliveryOptionDeliveryCharge > 0 && (
            <div>
              <span className="text-sm font-semibold text-primary-text">{t('deliveryCharge')}</span>
              <span className="text-sm font-medium text-secondary-text">
                ${deliveryOptionDeliveryCharge.toFixed(2)}{' '}
                {deliveryOptionFreeDeliveryThreshold !== undefined &&
                  t('freeDeliveryThreshold', {
                    freeDeliveryThreshold: deliveryOptionFreeDeliveryThreshold.toFixed(2),
                  })}
              </span>
            </div>
          )}
          {deliveryChargeAtThisOrder !== undefined && (
            <div>
              <span className="text-sm font-semibold text-primary-text">{t('deliveryChargeAtThisOrder')}</span>
              <span className="text-sm font-medium text-secondary-text">${deliveryChargeAtThisOrder.toFixed(2)} </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetail;
