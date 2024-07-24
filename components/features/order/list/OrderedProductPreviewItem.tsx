import ImageShow from '@/components/ui/image/ImageShow';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { OrderItem } from '@/models/order/OrderItem';
import { useLocale, useTranslations } from 'next-intl';

interface OrderedProductItemPreviewProps {
  orderItem: OrderItem;
}

const OrderedProductItemPreview = ({ orderItem }: OrderedProductItemPreviewProps) => {
  const t = useTranslations('Order.list');
  const locale = useLocale();

  const { nameEN, nameZH, image, quantity } = orderItem;
  const name = locale === 'en' ? nameEN : nameZH;

  return (
    <div className="flex gap-2 items-center">
      <div className="flex-0">
        <HoverPopup message={<ImageShow image={image} sizeClassName="size-32" />} background={false}>
          <ImageShow image={image} sizeClassName="size-8" />
        </HoverPopup>
      </div>
      <div className="flex-1">
        <div className="text-xs font-semibold text-primary-text text-ellipsis line-clamp-1">{name}</div>
        <div>
          <span className="text-xs font-semibold text-primary-text">{t('quantity')}</span>
          <span className="text-xs font-medium text-secondary-text">{quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderedProductItemPreview;
