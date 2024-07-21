import { useLanguage } from '@/lib/hooks/language/useLanguage';
import { District } from '@/types/District';
import { Region } from '@/types/Region';
import { useTranslations } from 'next-intl';

interface AddressReviewProps {
  isPickUp: boolean;
  contactName: string;
  contactPhoneNumber: string;
  detailAddress: string;
  district: District;
  region: Region;
  addressRemark?: string;
  storeName?: string;
  storePhoneNumber?: string;
  storeBusinessHours?: string;
}

const AddressReview = ({
  isPickUp,
  contactName,
  contactPhoneNumber,
  detailAddress,
  district,
  region,
  addressRemark,
  storeName,
  storePhoneNumber,
  storeBusinessHours,
}: AddressReviewProps) => {
  const t = useTranslations('Address.review');
  const { convertAddress } = useLanguage();

  return (
    <div className="space-y-2">
      <div className="font-semibold text-primary-text">
        {isPickUp ? t('pickupAddress') : t('deliveryAddress')}
        {isPickUp && (
          <span className="text-xs py-0.5 px-1 rounded-md max-w-max font-medium bg-green-200/50 text-green-500">
            {t('pickupAtStore')}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-sm font-medium text-tertiary-text">
          {isPickUp ? t('pickupAddressConfirmation') : t('deliveryAddressConfirmation')}
        </div>
        <div className="border-2 rounded-md px-8 py-2 border-slate-500/20">
          <div>
            <span className="text-sm font-semibold text-primary-text">{t('contactName')}</span>
            <span className="text-sm font-medium text-secondary-text">{contactName}</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-primary-text">{t('contactPhoneNumber')}</span>
            <span className="text-sm font-medium text-secondary-text">{contactPhoneNumber}</span>
          </div>
          <div className="text-sm font-semibold text-primary-text">{isPickUp ? storeName : addressRemark}</div>
          {storePhoneNumber !== undefined && (
            <div>
              <span className="text-sm font-semibold text-primary-text">{t('storePhoneNumber')}</span>
              <span className="text-sm font-medium text-secondary-text">{storePhoneNumber}</span>
            </div>
          )}
          <div>
            <span className="text-sm font-semibold text-primary-text">
              {isPickUp ? t('pickupAddress_') : t('deliveryAddress_')}
            </span>
            <span className="text-sm font-medium text-secondary-text">
              {convertAddress({ detailAddress, district, region })}
            </span>
          </div>
          {isPickUp && (
            <div>
              <span className="text-sm font-semibold text-primary-text">{t('businessHours')}</span>
              <span className="text-sm font-medium text-secondary-text">{storeBusinessHours}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressReview;
