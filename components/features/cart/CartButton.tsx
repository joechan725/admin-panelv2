import Cart from '@/components/icon/Cart';
import IconContainerWithBadgeCount from '@/components/ui/button/IconContainerWithBadgeCount';
import DropDown from '@/components/ui/popup/DropDown';
import { useCartStore } from '@/stores/useCartStore';
import { useState } from 'react';
import LoadUserCart from './LoadUserCart';
import BarButton from '@/components/form/BarButton';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

interface CartButtonProps {}
const CartButton = ({}: CartButtonProps) => {
  const t = useTranslations('Cart');

  const [isShowCart, setIsShowCart] = useState(false);
  const { totalQuantity } = useCartStore((state) => ({ totalQuantity: state.totalQuantity }));

  return (
    <>
      <IconContainerWithBadgeCount theme="secondary" badgeCount={totalQuantity} onClick={() => setIsShowCart(true)}>
        <Cart sizeClassName="size-6" />
      </IconContainerWithBadgeCount>
      {isShowCart && (
        <DropDown
          sizeClassName="max-w-full sm:max-w-[600px] w-full"
          className="px-4 py-6"
          onClose={() => setIsShowCart(false)}
          roundedClassName="rounded-md"
          positionClassName="-bottom-2 right-0"
          scroll={false}
          closeButton
        >
          <div className="space-y-2">
            <LoadUserCart sizeClassName="max-h-[480px]" />
            <div>
              <Link href="/checkout" onClick={() => setIsShowCart(false)}>
                <BarButton theme="secondary" disabled={false} type="button">
                  {t('checkout')}
                </BarButton>
              </Link>
            </div>
          </div>
        </DropDown>
      )}
    </>
  );
};
export default CartButton;
