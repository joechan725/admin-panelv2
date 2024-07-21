import BarButton from '@/components/form/BarButton';
import Cart from '@/components/icon/Cart';
import { useTranslations } from 'next-intl';

interface AddToCartButtonProps {
  roundedClassName?: string;
}

const AddToCartButton = ({ roundedClassName }: AddToCartButtonProps) => {
  const t = useTranslations('Product.button');
  return (
    <BarButton type="button" disabled={false} theme="secondary" roundedClassName={roundedClassName}>
      <div className="flex gap-2 items-center">
        <Cart sizeClassName="size-4 md:size-6" />
        <div className="text-sm lg:text-base">{t('addToCart')}</div>
      </div>
    </BarButton>
  );
};

export default AddToCartButton;
