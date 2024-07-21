import { useAddressStore } from '@/stores/useAddressStore';
import AddressSelectorList from './AddressSelectorList';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import CreateAddressButton from './CreateAddressButton';
import AddressSelectorItemSkeleton from './AddressSelectorItemSkeleton';
import { UseFormSetValue } from 'react-hook-form';
import { OrderPlacementSchema } from '@/schemas/order/orderPlacementSchema';
import { useTranslations } from 'next-intl';

interface AddressSelectorProps {
  setValue: UseFormSetValue<OrderPlacementSchema>;
  selectedAddressId?: string;
  hidden?: boolean;
}

const AddressSelector = ({ selectedAddressId, setValue, hidden }: AddressSelectorProps) => {
  const t = useTranslations('Address.selector');

  const { addresses, isLoading, loadingError } = useAddressStore((state) => ({
    addresses: state.addresses,
    isLoading: state.isLoading,
    loadingError: state.loadingError,
  }));

  if (hidden) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="font-semibold text-primary-text">{t('deliveryAddress')}</div>
        {isLoading && <AddressSelectorItemSkeleton />}
        {!isLoading && (
          <div>
            <div className="text-sm font-semibold text-tertiary-text mb-2">{t('deliveryAddressDescription')}</div>
            <AddressSelectorList addresses={addresses} selectedAddressId={selectedAddressId} setValue={setValue} />
          </div>
        )}
        {!isLoading && (!addresses || addresses.length === 0) && (
          <div className="text-sm font-semibold text-tertiary-text">{t('noSavedAddresses')}</div>
        )}
        {loadingError && <ErrorTranslation error={loadingError} />}
      </div>
      <div className="flex justify-end">
        <CreateAddressButton />
      </div>
    </div>
  );
};

export default AddressSelector;
