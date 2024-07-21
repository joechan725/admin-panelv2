import { DeliveryOptionSchema } from '@/schemas/deliveryOptionSchema';
import StoreAddressSelectorItem from './StoreAddressSelectorItem';
import { StoreAddress } from '@/models/store/StoreAddress';
import { UseFormSetValue } from 'react-hook-form';

interface StoreAddressSelectorListProps {
  storeAddresses: StoreAddress[];
  selectedStoreAddressId: string | undefined;
  setValue: UseFormSetValue<DeliveryOptionSchema>;
}

const StoreAddressSelectorList = ({
  storeAddresses,
  setValue,
  selectedStoreAddressId,
}: StoreAddressSelectorListProps) => {
  return (
    storeAddresses &&
    storeAddresses.length > 0 && (
      <div className="space-y-2">
        {storeAddresses.map((storeAddress) => (
          <StoreAddressSelectorItem
            storeAddress={storeAddress}
            key={storeAddress.id}
            setValue={setValue}
            selectedStoreAddressId={selectedStoreAddressId}
          />
        ))}
      </div>
    )
  );
};

export default StoreAddressSelectorList;
