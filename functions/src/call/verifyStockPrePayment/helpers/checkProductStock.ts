import { HttpsError } from 'firebase-functions/v1/auth';
import { ProductData } from '../../../models/product/ProductData';
import { OrderData } from '../../../models/order/OrderData';
import { db } from '../../../admin';
import { ProductListData } from '../../../models/product/ProductListData';

interface CheckProductStockParameters {
  pendingOrderData: OrderData;
}

export const checkProductStock = async ({ pendingOrderData }: CheckProductStockParameters) => {
  const { orderItems } = pendingOrderData;

  const productIds = orderItems.map((orderItem) => orderItem.productId);

  // Get the products
  const productListsRef = db.collection('productLists');
  const productListsQuery = productListsRef.where('ids', 'array-contains-any', [...productIds]);
  const productListsSnap = await productListsQuery.get();
  const productListsData = productListsSnap.docs.map((doc) => doc.data() as ProductListData);
  const productsData: (ProductData & { id: string })[] = productListsData.map((list) => list.products).flat();

  let newErrorMessage = '';

  for (let i = 0; i < orderItems.length; i++) {
    const orderItem = orderItems[i];

    const { productId, quantity, nameEN } = orderItem;

    const productData = productsData.find((product) => product.id === productId);

    if (!productData) {
      newErrorMessage =
        newErrorMessage += `Sorry, the product ${nameEN} has been removed from our inventory and is no longer available. `;
      continue;
    }

    const { stock, isPublic } = productData;

    // Add error message if the product stock is insufficient.
    if (stock <= 0) {
      newErrorMessage = newErrorMessage + `Sorry, ${name} is currently out of stock. `;
    }

    if (stock > 0 && quantity > stock) {
      newErrorMessage =
        newErrorMessage + `Sorry, only ${productData.stock} units of ${productData.nameEN} are available. `;
    }

    // Add error message if the product is private
    if (isPublic === false) {
      newErrorMessage =
        newErrorMessage +
        `Sorry, ${productData.nameEN} has been removed from our inventory and is no longer available. `;
    }
  }

  if (newErrorMessage !== '') {
    throw new HttpsError('out-of-range', newErrorMessage);
  }
};
