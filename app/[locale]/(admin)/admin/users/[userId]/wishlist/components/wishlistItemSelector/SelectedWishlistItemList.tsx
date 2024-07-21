import { WishlistItem } from '@/models/user/wishlistItem/WishlistItem';
import SelectedWishlistItem from './SelectedWishlistItem';
import { useTranslations } from 'next-intl';

interface SelectedWishlistItemListProps {
  setWishlistItems: React.Dispatch<React.SetStateAction<WishlistItem[]>>;
  wishlistItems: WishlistItem[];
  disabled: boolean;
}

const SelectedWishlistItemList = ({ wishlistItems, disabled, setWishlistItems }: SelectedWishlistItemListProps) => {
  const t = useTranslations('Selector');

  if (!wishlistItems || wishlistItems.length === 0) {
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
            <th className="p-2 text-slate-700 font-medium text-sm">{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems &&
            wishlistItems.length > 0 &&
            wishlistItems.map((wishlistItem) => (
              <SelectedWishlistItem
                key={wishlistItem.id}
                wishlistItem={wishlistItem}
                disabled={disabled}
                setWishlistItems={setWishlistItems}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedWishlistItemList;
