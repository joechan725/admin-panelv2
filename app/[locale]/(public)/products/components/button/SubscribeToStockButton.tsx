import BarButton from '@/components/form/BarButton';
import Bell from '@/components/icon/Bell';
import { useTranslations } from 'next-intl';

interface SubscribeToStockButtonProps {
  roundedClassName?: string;
}

const SubscribeToStockButton = ({ roundedClassName }: SubscribeToStockButtonProps) => {
  const t = useTranslations('Product.button');

  return (
    <BarButton type="button" disabled={false} theme="primary" roundedClassName={roundedClassName}>
      <div className="flex gap-2 items-center">
        <Bell sizeClassName="size-4 md:size-6" />
        <div className="text-sm lg:text-base">{t('RestockNotification')}</div>
      </div>
    </BarButton>
  );
};

export default SubscribeToStockButton;
