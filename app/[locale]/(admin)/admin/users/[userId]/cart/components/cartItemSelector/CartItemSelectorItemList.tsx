import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import Th from '@/components/table/Th';
import { Product } from '@/models/product/Product';
import CartItemSelectorItem from './CartItemSelectorItem';
import { CartItem } from '@/models/user/cartItem/CartItem';
import { useTranslations } from 'next-intl';
import PaginationClient from '@/components/search/PaginationClient';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';

interface CartItemSelectorItemListProps {
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  products: Product[];
  displayProducts: Product[] | null;
  disabled: boolean;
}

const CartItemSelectorItemList = ({
  displayProducts,
  products,
  disabled,
  setCartItems,
}: CartItemSelectorItemListProps) => {
  const t = useTranslations('Selector');

  return (
    <div className="space-y-2">
      <div className="text font-semibold text-slate-600">{t('products')}</div>
      <div className="max-w-96">
        <SearchQueryBarSuspense />
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-y border-slate-900/10 bg-gray-50/50">
            <Th searchParamsValue="product">{t('product')}</Th>
            <Th searchParamsValue="collection">{t('collection')}</Th>
            <Th searchParamsValue="category">{t('category')}</Th>
            <Th searchParamsValue="brand">{t('brand')}</Th>
            <Th searchParamsValue="price">{t('price')}</Th>
            <Th searchParamsValue="stock">{t('stock')}</Th>
            <Th>{t('quantity')}</Th>
            <Th>{t('actions')}</Th>
          </tr>
        </thead>
        <tbody>
          {displayProducts &&
            displayProducts.length > 0 &&
            displayProducts.map((product) => (
              <CartItemSelectorItem
                key={product.id}
                product={product}
                disabled={disabled}
                setCartItems={setCartItems}
              />
            ))}
        </tbody>
      </table>
      {(!products || products.length === 0) && (
        <div className="p-2 text-sm font-semibold text-gray-500">{t('noItems')}</div>
      )}
      {products && products.length > 0 && (!displayProducts || displayProducts.length === 0) && (
        <div className="p-2 text-sm font-semibold text-gray-500">{t('noItemsMatchSearching')}</div>
      )}
      <div className="flex justify-between">
        <PaginationIndicatorClient itemName={t('indicator')} itemsLength={products.length} itemsPerPage={10} />
        <PaginationClient theme="primary" itemsLength={products.length} itemsPerPage={10} />
      </div>
    </div>
  );
};

export default CartItemSelectorItemList;
