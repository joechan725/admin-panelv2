import { HttpsError } from 'firebase-functions/v1/auth';
import { CartItemData } from '../../../models/user/cartItem/CartItemData';
import { ProductListData } from '../../../models/product/ProductListData';
import { ProductData } from '../../../models/product/ProductData';
import { db } from '../../../admin';

export const validateCartItems = async (cartItemsData: (CartItemData & { id: string })[]) => {
  if (cartItemsData.some((cartItemData) => cartItemData.errorMessage)) {
    throw new HttpsError(
      'out-of-range',
      'There are some product in your cart is out ot stock or no longer available. Please update the product quantities or remove them from your cart before checking out.'
    );
  }

  const modifiedCartItemsData: (CartItemData & { id: string })[] = [...cartItemsData];
  const productIds = cartItemsData.map((cartItem) => cartItem.productId);

  const productListsRef = db.collection('productLists');
  const productListsQuery = productListsRef.where('ids', 'array-contains-any', [...productIds]);
  const productListsSnap = await productListsQuery.get();

  const productListsData = productListsSnap.docs.map((doc) => doc.data() as ProductListData);

  const productsData: (ProductData & { id: string })[] = productListsData.map((list) => list.products).flat();

  let newErrorMessage = '';

  for (let i = 0; i < modifiedCartItemsData.length; i++) {
    const modifiedCartItem = modifiedCartItemsData[i];

    const { quantity, productId, errorMessage } = modifiedCartItem;

    if (errorMessage) {
      continue;
    }

    const productData = productsData.find((productData) => productData.id === productId);

    // Add error message if the product does not exist
    if (!productData) {
      newErrorMessage =
        newErrorMessage +
        `Sorry, the product ${modifiedCartItem.nameEN} has been removed from our inventory and is no longer available. `;
      continue;
    }

    const {
      nameZH,
      nameEN,
      brandId,
      brandNameEN,
      brandNameZH,
      categoryId,
      categoryNameEN,
      categoryNameZH,
      collectionId,
      collectionNameEN,
      collectionNameZH,
      images,
      markedPrice,
      sellingPrice,
      commentCount,
      rating,
      descriptionZH,
      descriptionEN,
      stock,
      isPublic,
    } = productData;

    modifiedCartItem.nameZH = nameZH;
    modifiedCartItem.nameEN = nameEN;
    modifiedCartItem.brandId = brandId;
    modifiedCartItem.brandNameEN = brandNameEN;
    modifiedCartItem.brandNameZH = brandNameZH;
    modifiedCartItem.categoryId = categoryId;
    modifiedCartItem.categoryNameEN = categoryNameEN;
    modifiedCartItem.categoryNameZH = categoryNameZH;
    modifiedCartItem.collectionId = collectionId;
    modifiedCartItem.collectionNameEN = collectionNameEN;
    modifiedCartItem.collectionNameZH = collectionNameZH;
    modifiedCartItem.image = images?.[0];
    modifiedCartItem.markedPrice = markedPrice;
    modifiedCartItem.sellingPrice = sellingPrice;
    modifiedCartItem.commentCount = commentCount;
    modifiedCartItem.rating = rating;
    modifiedCartItem.descriptionZH = descriptionZH;
    modifiedCartItem.descriptionEN = descriptionEN;

    // Add error message if the product stock is insufficient.
    if (stock <= 0) {
      newErrorMessage = newErrorMessage + `Sorry, ${nameEN} is currently out of stock. `;
    }

    if (stock > 0 && quantity > stock) {
      newErrorMessage = newErrorMessage + `Sorry, only ${stock} units of ${nameEN} are available. `;
    }

    // Add error message if the product is private
    if (isPublic === false) {
      newErrorMessage =
        newErrorMessage + `Sorry, ${nameEN} has been removed from our inventory and is no longer available. `;
    }
  }

  if (newErrorMessage !== '') {
    throw new HttpsError('out-of-range', newErrorMessage);
  }

  return modifiedCartItemsData;
};
