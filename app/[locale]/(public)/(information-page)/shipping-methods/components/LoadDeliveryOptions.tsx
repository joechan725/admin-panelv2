import { getDeliveryOptionLists } from '@/firebase/api/deliveryOption/getDeliveryOptionLists';
import { useTranslations } from 'next-intl';
import DeliveryOptionList from './DeliveryOptionList';

interface LoadDeliveryOptionsProps {}

const LoadDeliveryOptions = async ({}: LoadDeliveryOptionsProps) => {
  const t = useTranslations('Error');

  try {
    const deliveryOptions = await getDeliveryOptionLists();

    return <DeliveryOptionList deliveryOptions={deliveryOptions} />;
  } catch (error) {
    return <div className="text-sm font-medium text-secondary-text">{t('unexpectedError')}</div>;
  }
};

export default LoadDeliveryOptions;
