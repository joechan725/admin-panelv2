import { PrivateDeliveryOption } from '@/models/deliveryOption/PrivateDeliveryOption';
import DeliveryOptionItem from './DeliveryOptionItem';

interface DeliveryOptionListProps {
  deliveryOptions: PrivateDeliveryOption[];
  onSelect?: (id: string) => void;
  selectedDeliveryOptionIds?: string[];
}
const DeliveryOptionList = ({ deliveryOptions, onSelect, selectedDeliveryOptionIds }: DeliveryOptionListProps) => {
  return (
    deliveryOptions &&
    deliveryOptions.length > 0 &&
    deliveryOptions.map((deliveryOption) => (
      <DeliveryOptionItem
        key={deliveryOption.id}
        privateDeliveryOption={deliveryOption}
        onSelect={onSelect}
        isSelect={selectedDeliveryOptionIds && selectedDeliveryOptionIds.includes(deliveryOption.id)}
      />
    ))
  );
};
export default DeliveryOptionList;
