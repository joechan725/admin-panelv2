import { FieldValue } from 'firebase-admin/firestore';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { CartItem } from '../../../models/user/cartItem/CartItem';
import { ProductData as PublicProductData } from '../../../models/product/ProductData';
import { checkFieldsEqual } from '../../../lib/helpers/object/checkFieldsEqual';
import { CartItemData } from '../../../models/user/cartItem/CartItemData';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateCartItemsParameter {
  productId: string;
  publicProductDataAfter: PublicProductData;
  publicProductDataBefore?: PublicProductData;
  mode: 'update' | 'delete';
}

/**
 * Updated the cart items when the product is updated.
 * (When the stock is updated or the product is deleting only)
 * Also check the stock of product against the cartItem quantity.
 *
 * @param productId The product being updated.
 * @param productData The product being updated.
 * @param mode 'update' | 'delete'
 * @returns The promise of void.
 */

export const updateCartItems = async ({
  productId,
  publicProductDataAfter,
  publicProductDataBefore,
  mode,
}: UpdateCartItemsParameter) => {
  if (
    checkFieldsEqual(publicProductDataAfter, publicProductDataBefore, [
      'brandId',
      'brandNameEN',
      'brandNameZH',
      'categoryId',
      'categoryNameEN',
      'categoryNameZH',
      'collectionId',
      'collectionNameEN',
      'collectionNameZH',
      'descriptionEN',
      'descriptionZH',
      'images',
      'markedPrice',
      'nameEN',
      'nameZH',
      'rating',
      'sellingPrice',
      'stock',
      'isPublic',
    ]) &&
    mode === 'update'
  ) {
    // The information of products is the same before and after update
    // Also the product is not deleting
    // No update of cart item is required
    // Return
    return;
  }

  try {
    // update all the cartItems with given product id
    const cartItemsRef = db.collectionGroup('cartItems');
    const cartItemsQuery = cartItemsRef.where('productId', '==', productId);

    const cartItemsSnap = await cartItemsQuery.get();

    const bigBatch = new BigBatch(db);

    cartItemsSnap.forEach((snap) => {
      const previousCartItemData = snap.data() as CartItemData;
      // update the product inside the cartItem document
      const updatedCartItemData: ExtendWithFieldValue<Partial<CartItem>> = {
        nameEN: publicProductDataAfter.nameEN,
        nameZH: publicProductDataAfter.nameZH,
        brandId: publicProductDataAfter.brandId,
        brandNameEN: publicProductDataAfter.brandNameEN,
        brandNameZH: publicProductDataAfter.brandNameZH,
        collectionId: publicProductDataAfter.collectionId,
        collectionNameEN: publicProductDataAfter.collectionNameEN,
        collectionNameZH: publicProductDataAfter.collectionNameZH,
        categoryId: publicProductDataAfter.categoryId,
        categoryNameEN: publicProductDataAfter.categoryNameEN,
        categoryNameZH: publicProductDataAfter.categoryNameZH,
        commentCount: publicProductDataAfter.commentCount,
        descriptionEN: publicProductDataAfter.descriptionEN,
        descriptionZH: publicProductDataAfter.descriptionZH,
        image: publicProductDataAfter.images?.[0],
        markedPrice: publicProductDataAfter.markedPrice,
        sellingPrice: publicProductDataAfter.sellingPrice,
        rating: publicProductDataAfter.rating,
        stock: publicProductDataAfter.stock,
        updatedAt: FieldValue.serverTimestamp(),
        errorMessage: FieldValue.delete(),
      };

      // Add error message if the product is out of stock / not enough stock / deleting.
      if (publicProductDataAfter.stock <= 0) {
        updatedCartItemData.errorMessage = `out of stock`;
      }

      if (publicProductDataAfter.stock > 0 && previousCartItemData.quantity > publicProductDataAfter.stock) {
        updatedCartItemData.errorMessage = `not enough stock`;
      }

      // Add error message if the product is being deleted or turn to isPublic.
      if (publicProductDataAfter.isPublic === false || mode === 'delete') {
        updatedCartItemData.errorMessage = `no longer available`;
      }

      bigBatch.update(snap.ref, { ...updatedCartItemData });
    });

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating cart items after product changes', error);
  }
};
