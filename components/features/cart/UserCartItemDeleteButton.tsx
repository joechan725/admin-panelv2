import XMark from '@/components/icon/XMark';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { useCartStore } from '@/stores/useCartStore';
import { useTranslations } from 'next-intl';

interface UserCartItemDeleteButtonProps {
  cartItemId: string;
}
const UserCartItemDeleteButton = ({ cartItemId }: UserCartItemDeleteButtonProps) => {
  const t = useTranslations('Cart');

  const { removeItemFromCart } = useCartStore((state) => ({ removeItemFromCart: state.removeItemFromCart }));

  return (
    <HoverPopup message={t('remove')} algin="right" position="bottom">
      <button onClick={() => removeItemFromCart(cartItemId)}>
        <XMark
          sizeClassName="size-4"
          className="text-danger transition-all group-hover:text-opacity-85 group-active:text-opacity-70"
        />
      </button>
    </HoverPopup>
  );
};
export default UserCartItemDeleteButton;
