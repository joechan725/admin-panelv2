'use client';

import BoxButton from '@/components/form/BoxButton';
import LoadingSpin from '@/components/loading/LoadingSpin';
import { useOrder } from '@/lib/hooks/order/useOrder';
import { OrderItem } from '@/models/order/OrderItem';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SelectedOrderItemList from './SelectedOrderItemList';
import OrderItemSelectorList from './OrderItemSelectorList';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import RadioHollow from '@/components/form/RadioHollow';
import { usePrivateProductListsListener } from '@/lib/hooks/product/usePrivateProductListsListener';
import { useOrderListener } from '@/lib/hooks/order/useOrderListener';
import { searchAndOrderProducts } from '../../../products/components/list/searchAndOrderProducts';
import { useLocale, useTranslations } from 'next-intl';

interface AddOrderItemsSelectorProps {
  onSuccess?: () => void;
}

const AddOrderItemsSelector = ({ onSuccess }: AddOrderItemsSelectorProps) => {
  const t = useTranslations('Selector');
  const locale = useLocale();

  const params = useParams<{ orderId: string }>();
  const searchParams = useSearchParams();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [decrementProductStock, setDecrementProductStock] = useState(true);

  const { orderId } = params;

  const {
    privateProducts,
    error: productLoadingError,
    isLoading: isLoadingProducts,
  } = usePrivateProductListsListener();
  const { order, error: orderLoadingError, isLoading: isLoadingOrder } = useOrderListener(orderId);
  const { addItemsToOrder, isWriting, error: orderWritingError } = useOrder();

  if (isLoadingOrder || isLoadingProducts) {
    return <LoadingSpin layout="line" theme="secondary" />;
  }

  if (!order) {
    notFound();
  }

  if (!privateProducts || privateProducts.length === 0) {
    return <LoadingSpin layout="line" theme="secondary" />;
  }

  const existingOrderItems = order.orderItems;
  const existingOrderedProductIds = existingOrderItems.map((item) => item.productId);

  const newOrderedProductIds = orderItems.map((item) => item.productId);

  const availableProducts = privateProducts
    .filter((product) => !existingOrderedProductIds.includes(product.id))
    .filter((product) => !newOrderedProductIds.includes(product.id));

  const disPlayProducts = searchAndOrderProducts({
    privateProducts: availableProducts,
    searchParams,
    locale,
  });

  const handleAddProductsToOrder = async () => {
    const res = await addItemsToOrder({ orderId, orderItems, order, decrementProductStock });

    if (res && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between ml-2">
        <div className="text-lg font-semibold text-primary-text">{t('orderItemSelectorTitle', { orderId })}</div>
        <div className="flex gap-4 items-center">
          <button className="flex gap-2 items-center group" onClick={() => setDecrementProductStock((prev) => !prev)}>
            <RadioHollow isSelected={decrementProductStock} theme="primary" size="sm" />
            <div className="font-medium text-secondary-text group-hover:text-opacity-85 group-active:text-opacity-70 transition-all">
              {t('updateTheProductStockAlso')}
            </div>
          </button>
          <BoxButton
            disabled={isWriting}
            theme="primary"
            type="button"
            onClick={handleAddProductsToOrder}
            fontSize="sm"
          >
            {t('save')}
          </BoxButton>
        </div>
      </div>
      <ErrorTranslation error={orderWritingError} align="right" />
      <div className="space-y-4">
        <SelectedOrderItemList disabled={isWriting} orderItems={orderItems} setOrderItems={setOrderItems} />
        <OrderItemSelectorList
          disabled={isWriting}
          products={availableProducts}
          displayProducts={disPlayProducts}
          setOrderItems={setOrderItems}
        />
        <ErrorTranslation error={productLoadingError} />
        <ErrorTranslation error={orderLoadingError} />
      </div>
    </div>
  );
};
export default AddOrderItemsSelector;
