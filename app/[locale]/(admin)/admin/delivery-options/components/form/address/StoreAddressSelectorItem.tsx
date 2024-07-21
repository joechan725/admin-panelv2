import { formatAddress } from '@/lib/helpers/language/formatAddress';
import { useLanguage } from '@/lib/hooks/language/useLanguage';
import { StoreAddress } from '@/models/store/StoreAddress';
import { DeliveryOptionSchema } from '@/schemas/deliveryOptionSchema';
import clsx from 'clsx/lite';
import { useLocale, useTranslations } from 'next-intl';
import { UseFormSetValue } from 'react-hook-form';

interface StoreAddressSelectorItemProps {
  storeAddress: StoreAddress;
  selectedStoreAddressId: string | undefined;
  setValue: UseFormSetValue<DeliveryOptionSchema>;
}

const StoreAddressSelectorItem = ({
  storeAddress,
  setValue,
  selectedStoreAddressId,
}: StoreAddressSelectorItemProps) => {
  const t = useTranslations('Address.storeAddress');
  const { convertAddress } = useLanguage();

  const { id, name, phoneNumber, region, district, detailAddress, businessHours } = storeAddress;

  const isSelected = selectedStoreAddressId === id;

  const handleClick = () => {
    setValue('storeAddressId', id);
    setValue('storeAddressName', name);
    setValue('storeAddressPhoneNumber', phoneNumber);
    setValue('storeAddressRegion', region as DeliveryOptionSchema['storeAddressRegion']);
    setValue('storeAddressDistrict', district as DeliveryOptionSchema['storeAddressDistrict']);
    setValue('storeAddressDetailAddress', detailAddress);
    setValue('storeAddressBusinessHours', businessHours);
  };

  return (
    <div
      className={clsx(
        ' border-2 hover:border-secondary-bg rounded-md px-8 py-2',
        isSelected ? 'border-2 border-secondary-bg' : 'border-slate-500/20'
      )}
      role="button"
      onClick={handleClick}
    >
      <div className="text-sm font-semibold text-primary-text">{name}</div>
      <div>
        <span className="text-sm font-semibold text-primary-text">{t('phoneNumber')}</span>
        <span className="text-sm font-medium text-secondary-text">{phoneNumber}</span>
      </div>
      <div className="text-sm font-medium text-secondary-text">
        {convertAddress({ detailAddress, district, region })}
      </div>
      <div>
        <span className="text-sm font-semibold text-primary-text">{t('businessHours')}</span>
        <span className="text-sm font-medium text-secondary-text">{businessHours}</span>
      </div>
    </div>
  );
};

export default StoreAddressSelectorItem;
