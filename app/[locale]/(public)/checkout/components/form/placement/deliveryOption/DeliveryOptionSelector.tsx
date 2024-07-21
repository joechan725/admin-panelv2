import ErrorTranslation from '@/components/form/ErrorTranslation';
import { useDeliveryOptionListsListener } from '@/lib/hooks/deliveryOption/useDeliveryOptionListsListener';
import DeliveryOptionSelectorList from './DeliveryOptionSelectorList';
import { UseFormSetValue } from 'react-hook-form';
import { OrderPlacementSchema } from '@/schemas/order/orderPlacementSchema';
import DeliveryOptionSelectorItemSkeleton from './DeliveryOptionSelectorItemSkeleton';
import { useTranslations } from 'next-intl';

interface DeliveryOptionSelector {
  selectedDeliveryOptionId?: string;
  setValue: UseFormSetValue<OrderPlacementSchema>;
}

const DeliveryOptionSelector = ({ selectedDeliveryOptionId, setValue }: DeliveryOptionSelector) => {
  const t = useTranslations('DeliveryOption.selector');

  const { deliveryOptions, error, isLoading } = useDeliveryOptionListsListener();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="font-semibold text-primary-text">{t('deliveryOptions')}</div>
        {isLoading && <DeliveryOptionSelectorItemSkeleton />}
        {!isLoading && (
          <div>
            <div className="text-sm font-semibold text-tertiary-text mb-2">{t('deliveryOptionDescription')}</div>
            <DeliveryOptionSelectorList
              setValue={setValue}
              deliveryOptions={deliveryOptions}
              selectedDeliveryOptionId={selectedDeliveryOptionId}
            />
          </div>
        )}
        {!isLoading && (!deliveryOptions || deliveryOptions.length === 0) && (
          <div className="text-sm font-semibold text-tertiary-text">{t('noDeliveryOptions')}</div>
        )}
        <ErrorTranslation error={error} />
      </div>
    </div>
  );
};

export default DeliveryOptionSelector;
