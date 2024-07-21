import { Address } from '@/models/Address';
import AddressSelectorItem from './AddressSelectorItem';
import { OrderPlacementSchema } from '@/schemas/order/orderPlacementSchema';
import { UseFormSetValue } from 'react-hook-form';

interface AddressSelectorListProps {
  addresses: Address[];
  setValue: UseFormSetValue<OrderPlacementSchema>;
  selectedAddressId?: string;
}

const AddressSelectorList = ({ addresses, setValue, selectedAddressId }: AddressSelectorListProps) => {
  return (
    addresses &&
    addresses.length > 0 && (
      <div className="space-y-2">
        {addresses.map((address) => (
          <AddressSelectorItem
            address={address}
            key={address.id}
            setValue={setValue}
            selectedAddressId={selectedAddressId}
          />
        ))}
      </div>
    )
  );
};

export default AddressSelectorList;
