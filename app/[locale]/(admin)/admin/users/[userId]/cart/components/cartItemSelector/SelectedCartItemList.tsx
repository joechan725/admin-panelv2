import { useTranslations } from 'next-intl';
import SelectedCartItem from './SelectedCartItem';
import { CartItem } from '@/models/user/cartItem/CartItem';

interface SelectedCartItemListProps {
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartItems: CartItem[];
  disabled: boolean;
}

const SelectedCartItemList = ({ cartItems, disabled, setCartItems }: SelectedCartItemListProps) => {
  const t = useTranslations('Selector');

  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="text font-semibold text-slate-600">{t('selectedProducts')}</div>
      <table className="w-full">
        <thead>
          <tr className="border-y border-slate-900/10 bg-gray-50/50">
            <th className="p-2 text-slate-700 font-medium text-sm">{t('product')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('collection')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('category')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('brand')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('price')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('stock')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('quantity')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((cartItem) => (
              <SelectedCartItem key={cartItem.id} cartItem={cartItem} disabled={disabled} setCartItems={setCartItems} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedCartItemList;
