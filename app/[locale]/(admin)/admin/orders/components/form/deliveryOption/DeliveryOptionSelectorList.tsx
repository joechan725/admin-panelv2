import { DeliveryOption } from '@/models/deliveryOption/DeliveryOption';
import DeliveryOptionSelectorItem from './DeliveryOptionSelectorItem';
import { UseFormSetValue } from 'react-hook-form';
import { OrderInformationSchema } from '@/schemas/order/orderInformationSchema';

interface DeliveryOptionSelectorListProps {
  deliveryOptions: DeliveryOption[];
  selectedDeliveryOptionId?: string;
  setValue: UseFormSetValue<OrderInformationSchema>;
}

const DeliveryOptionSelectorList = ({
  deliveryOptions,
  selectedDeliveryOptionId,
  setValue,
}: DeliveryOptionSelectorListProps) => {
  return (
    deliveryOptions &&
    deliveryOptions.length > 0 && (
      <div className="space-y-2">
        {deliveryOptions.map((deliveryOption) => (
          <DeliveryOptionSelectorItem
            key={deliveryOption.id}
            deliveryOption={deliveryOption}
            selectedDeliveryOptionId={selectedDeliveryOptionId}
            setValue={setValue}
          />
        ))}
      </div>
    )
  );
};

export default DeliveryOptionSelectorList;
