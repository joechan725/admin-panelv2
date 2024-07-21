import { useLanguage } from '@/lib/hooks/language/useLanguage';
import { Address } from '@/models/Address';
import { OrderPlacementSchema } from '@/schemas/order/orderPlacementSchema';
import clsx from 'clsx/lite';
import { useTranslations } from 'next-intl';
import { UseFormSetValue } from 'react-hook-form';

interface AddressSelectorItemProps {
  address: Address;
  setValue: UseFormSetValue<OrderPlacementSchema>;
  selectedAddressId?: string;
}

const AddressSelectorItem = ({ address, setValue, selectedAddressId }: AddressSelectorItemProps) => {
  const t = useTranslations('Address.selector');
  const { convertAddress } = useLanguage();

  const { remark, contactName, contactPhoneNumber, region, district, detailAddress, id } = address;

  const isSelected = selectedAddressId === id;

  const handleClick = () => {
    setValue('isPickUp', false);
    setValue('deliveryAddressId', id);
    setValue('addressRemark', (remark ?? '') as OrderPlacementSchema['addressRemark']);
    setValue('deliveryDistrict', district as OrderPlacementSchema['deliveryDistrict']);
    setValue('deliveryRegion', region);
    setValue('deliveryDetailAddress', detailAddress);
    setValue('contactName', contactName);
    setValue('contactPhoneNumber', contactPhoneNumber);
    setValue('storeName', '');
    setValue('storePhoneNumber', '');
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
      <div className="text-sm font-semibold text-primary-text">{remark}</div>
      <div className="text-sm font-medium text-secondary-text">{contactName}</div>
      <div>
        <span className="text-sm font-semibold text-primary-text">{t('phoneNumber')}</span>
        <span className="text-sm font-medium text-secondary-text">{contactPhoneNumber}</span>
      </div>
      <div>
        <span className="text-sm font-semibold text-primary-text">{t('detailAddress')}</span>
        <span className="text-sm font-medium text-secondary-text">
          {convertAddress({ detailAddress, district, region })}
        </span>
      </div>
    </div>
  );
};

export default AddressSelectorItem;
