import { DocumentData, DocumentReference, FieldValue } from 'firebase-admin/firestore';
import { ExtendWithFieldValue } from '../../../../types/ExtendWithFieldValue';
import { CartItem } from '../../../../models/user/cartItem/CartItem';
import { CartItemData } from '../../../../models/user/cartItem/CartItemData';
import { ProductData } from '../../../../models/product/ProductData';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface CheckProductStockParameter {
  cartItemData: CartItemData;
  cartItemRef: DocumentReference<DocumentData>;
}
/**
 * Check the stock of product against the cartItem quantity.
 *
 * @param cartItemRef - The document reference of cartItem.
 * @param cartItem The cartItem data.
 * @returns The promise of boolean (if the checking pass).
 */

export const checkProductStock = async ({ cartItemData, cartItemRef }: CheckProductStockParameter) => {
  try {
    const previousErrorMessage = cartItemData.errorMessage;

    let newErrorMessage: CartItem['errorMessage'] = undefined;

    // Get the product data
    const productRef = db.collection('products').doc(cartItemData.productId);

    const productSnap = await productRef.get();

    if (!productSnap.exists) {
      newErrorMessage = 'no longer available';
      const cartItemData: ExtendWithFieldValue<Partial<CartItem>> = {
        errorMessage: newErrorMessage,
        updatedAt: FieldValue.serverTimestamp(),
      };
      await cartItemRef.update({ ...cartItemData });
      return { runRemainingCode: false };
    }

    const foundProductData = productSnap.data() as ProductData;

    if (foundProductData.stock <= 0) {
      newErrorMessage = 'out of stock';
    }

    if (foundProductData.stock > 0 && cartItemData.quantity > foundProductData.stock) {
      newErrorMessage = 'not enough stock';
    }

    if (foundProductData.isPublic === false) {
      newErrorMessage = 'no longer available';
    }

    if (
      previousErrorMessage !== newErrorMessage ||
      cartItemData.sellingPrice !== foundProductData.sellingPrice ||
      cartItemData.markedPrice !== foundProductData.markedPrice ||
      cartItemData.nameEN !== foundProductData.nameEN ||
      cartItemData.nameZH !== foundProductData.nameZH ||
      cartItemData.rating !== foundProductData.rating ||
      cartItemData.image?.url !== foundProductData.images?.[0].url ||
      cartItemData.descriptionEN !== foundProductData.descriptionEN ||
      cartItemData.descriptionZH !== foundProductData.descriptionZH
    ) {
      const cartItemData: ExtendWithFieldValue<Partial<CartItem>> = {
        errorMessage: newErrorMessage,
        nameEN: foundProductData.nameEN,
        nameZH: foundProductData.nameZH,
        brandId: foundProductData.brandId,
        brandNameEN: foundProductData.brandNameEN,
        brandNameZH: foundProductData.brandNameZH,
        collectionId: foundProductData.collectionId,
        collectionNameEN: foundProductData.collectionNameEN,
        collectionNameZH: foundProductData.collectionNameZH,
        categoryId: foundProductData.categoryId,
        categoryNameEN: foundProductData.categoryNameEN,
        categoryNameZH: foundProductData.categoryNameZH,
        commentCount: foundProductData.commentCount,
        descriptionEN: foundProductData.descriptionEN,
        descriptionZH: foundProductData.descriptionZH,
        image: foundProductData.images?.[0],
        markedPrice: foundProductData.markedPrice,
        sellingPrice: foundProductData.sellingPrice,
        rating: foundProductData.rating,
        stock: foundProductData.stock,
        updatedAt: FieldValue.serverTimestamp(),
      };
      await cartItemRef.update({ ...cartItemData });
      return { runRemainingCode: false };
    }
    return { runRemainingCode: true };
  } catch (error) {
    logger.error('Error on checking product stock for cart item', error);
    return { runRemainingCode: true };
  }
};
