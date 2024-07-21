import StoreAddressItem from './StoreAddressItem';
import { StoreAddress } from '@/models/store/StoreAddress';

interface StoreAddressListProps {
  storeAddresses: StoreAddress[];
}

const StoreAddressList = ({ storeAddresses }: StoreAddressListProps) => {
  return (
    storeAddresses &&
    storeAddresses.length > 0 && (
      <div className="space-y-4 mt-2">
        {storeAddresses.map((storeAddress) => (
          <StoreAddressItem storeAddress={storeAddress} key={storeAddress.id} />
        ))}
      </div>
    )
  );
};

export default StoreAddressList;
