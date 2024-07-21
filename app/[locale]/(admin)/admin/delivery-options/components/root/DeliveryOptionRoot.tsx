import Widget from '@/components/layout/container/Widget';
import { useTranslations } from 'next-intl';
import DeliveryOptionFrame from '../frame/DeliveryOptionFrame';

interface Props {}
const DeliveryOptionRoot = (props: Props) => {
  const t = useTranslations('DeliveryOption.list');

  return (
    <div className="space-y-5">
      <h2 className="ml-2 text-2xl text-slate-700 font-semibold">{t('title')}</h2>
      <Widget className="p-4">
        <DeliveryOptionFrame />
      </Widget>
    </div>
  );
};
export default DeliveryOptionRoot;
