import { DeliveryOption } from '@/models/deliveryOption/DeliveryOption';
import DeliveryOptionItem from './DeliveryOptionItem';
import { useTranslations } from 'next-intl';

interface DeliveryOptionListProps {
  deliveryOptions: DeliveryOption[];
}

const DeliveryOptionList = ({ deliveryOptions }: DeliveryOptionListProps) => {
  const t = useTranslations('DeliveryOption.page');

  if (deliveryOptions.length === 0) {
    return <div className="text-sm font-medium text-secondary-text">{t('noItems')}</div>;
  }

  return deliveryOptions.map((deliveryOption) => (
    <DeliveryOptionItem key={deliveryOption.id} deliveryOption={deliveryOption} />
  ));
};

export default DeliveryOptionList;
