import StoreAddressSelectorList from './StoreAddressSelectorList';
import CreateStoreAddressButton from './CreateStoreAddressButton';
import StoreAddressSelectorItemSkeleton from './StoreAddressSelectorItemSkeleton';
import { useStoreAddressListListener } from '@/lib/hooks/storeAddress/useStoreAddressListListener';
import { UseFormSetValue } from 'react-hook-form';
import { DeliveryOptionSchema } from '@/schemas/deliveryOptionSchema';
import { useTranslations } from 'next-intl';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface StoreAddressSelectorProps {
  selectedStoreAddressId: string | undefined;
  setValue: UseFormSetValue<DeliveryOptionSchema>;
  hidden: boolean;
}

const StoreAddressSelector = ({ selectedStoreAddressId, setValue, hidden }: StoreAddressSelectorProps) => {
  const t = useTranslations('DeliveryOption.form');

  const { storeAddresses, error, isLoading } = useStoreAddressListListener();

  if (hidden) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-primary-text">{t('pickUpAddress')}</div>
        <CreateStoreAddressButton />
      </div>
      {isLoading && <StoreAddressSelectorItemSkeleton />}
      {!isLoading && (
        <div>
          <div className="text-sm font-semibold text-tertiary-text">{t('addressDescription')}</div>
          <StoreAddressSelectorList
            storeAddresses={storeAddresses}
            setValue={setValue}
            selectedStoreAddressId={selectedStoreAddressId}
          />
        </div>
      )}
      {!isLoading && (!storeAddresses || storeAddresses.length === 0) && (
        <div className="text-sm font-semibold text-tertiary-text">{t('noAddresses')}</div>
      )}
      <ErrorTranslation error={error} />
    </div>
  );
};

export default StoreAddressSelector;
