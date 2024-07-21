import { Address } from '@/models/Address';
import AddressItem from './AddressItem';

interface AddressListProps {
  addresses: Address[];
  mode: 'user' | 'admin';
}
const AddressList = ({ addresses, mode }: AddressListProps) => {
  return (
    addresses &&
    addresses.length > 0 && (
      <div className="space-y-4 mt-2">
        {addresses.map((address) => (
          <AddressItem address={address} mode={mode} key={address.id} />
        ))}
      </div>
    )
  );
};
export default AddressList;
