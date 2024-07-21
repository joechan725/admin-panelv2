import XMark from '@/components/icon/XMark';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { useAdminCartItem } from '@/lib/hooks/user/admin/cartItem/useAdminCartItem';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface AdminCartItemDeleteButtonProps {
  cartItemId: string;
}

const AdminCartItemDeleteButton = ({ cartItemId }: AdminCartItemDeleteButtonProps) => {
  const t = useTranslations('Cart');

  const { removeItemFromCart, isWriting } = useAdminCartItem();

  const params = useParams<{ userId: string }>();

  const { userId } = params;

  return (
    <HoverPopup message={t('remove')} algin="right">
      <button onClick={() => removeItemFromCart({ cartItemId, userId })} disabled={isWriting} className="group">
        <XMark
          sizeClassName="size-4"
          className="text-danger transition-all group-hover:text-opacity-85 group-active:text-opacity-70 group-disabled:text-opacity-70 group-disabled:cursor-wait"
        />
      </button>
    </HoverPopup>
  );
};

export default AdminCartItemDeleteButton;
