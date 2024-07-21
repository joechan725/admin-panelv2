import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import Th from '@/components/table/Th';
import { Product } from '@/models/product/Product';
import { OrderItem } from '@/models/order/OrderItem';
import OrderItemSelectorItem from './OrderItemSelectorItem';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import PaginationClient from '@/components/search/PaginationClient';
import { useTranslations } from 'next-intl';

interface OrderItemSelectorListProps {
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  products: Product[];
  displayProducts: Product[] | null;
  disabled: boolean;
}

const OrderItemSelectorList = ({ displayProducts, products, disabled, setOrderItems }: OrderItemSelectorListProps) => {
  const t = useTranslations('Selector');

  return (
    <div className="space-y-2">
      <div className="text font-semibold text-slate-600">{t('products')}</div>
      <div className="max-w-96">
        <SearchQueryBarSuspense placeholder="Search..." />
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
              <OrderItemSelectorItem
                key={product.id}
                product={product}
                disabled={disabled}
                setOrderItems={setOrderItems}
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

export default OrderItemSelectorList;
