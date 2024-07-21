import Eye from '@/components/icon/Eye';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

interface OrderViewDetailLinkProps {
  orderId: string;
  mode: 'admin' | 'user';
}

const OrderViewDetailLink = ({ orderId, mode }: OrderViewDetailLinkProps) => {
  const t = useTranslations('Order');

  const href = mode === 'user' ? `/orders/${orderId}` : `/admin/orders/${orderId}`;

  return (
    <HoverPopup message={t('viewDetail')}>
      <IconButton disabled={false} type="button" theme="secondary">
        <Link href={href}>
          <Eye sizeClassName="size-5" />
        </Link>
      </IconButton>
    </HoverPopup>
  );
};

export default OrderViewDetailLink;
