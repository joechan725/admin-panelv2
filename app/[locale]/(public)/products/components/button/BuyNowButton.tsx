import BarButton from '@/components/form/BarButton';
import ShoppingBag from '@/components/icon/ShoppingBag';
import { useTranslations } from 'next-intl';

interface BuyNowButtonProps {}

const BuyNowButton = ({}: BuyNowButtonProps) => {
  const t = useTranslations('Product.button');

  return (
    <BarButton type="button" disabled={false} theme="primary">
      <div className="flex gap-2 items-center">
        <ShoppingBag sizeClassName="size-4 md:size-6" />
        <div className="text-sm lg:text-base">{t('buyNow')}</div>
      </div>
    </BarButton>
  );
};

export default BuyNowButton;
