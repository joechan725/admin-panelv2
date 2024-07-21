import { FieldValue } from 'firebase-admin/firestore';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { WishlistItem } from '../../../models/user/wishlistItem/WishlistItem';
import { ProductData as PublicProductData } from '../../../models/product/ProductData';
import { checkFieldsEqual } from '../../../lib/helpers/object/checkFieldsEqual';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateWishlistItemsParameter {
  productId: string;
  publicProductDataAfter: PublicProductData;
  publicProductDataBefore?: PublicProductData;
  mode: 'update' | 'delete';
}

/**
 * Updated the wishlist items when the product is updated.
 * (When the stock is updated or the product is deleting only)
 * Also check the stock of product against the wishlistItem quantity.
 *
 * @param productId The product being updated.
 * @param productData The product being updated.
 * @param mode 'update' | 'delete'
 * @returns The promise of void.
 */

export const updateWishlistItems = async ({
  productId,
  publicProductDataAfter,
  publicProductDataBefore,
  mode,
}: UpdateWishlistItemsParameter) => {
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
    // No update of wishlist item is required
    // Return
    return;
  }

  try {
    // update all the wishlistItems with given product id
    const wishlistItemsRef = db.collectionGroup('wishlistItems');
    const wishlistItemsQuery = wishlistItemsRef.where('productId', '==', productId);

    const wishlistItemsSnap = await wishlistItemsQuery.get();

    const bigBatch = new BigBatch(db);

    wishlistItemsSnap.forEach((snap) => {
      // update the product inside the wishlistItem document
      const updatedWishlistItemData: ExtendWithFieldValue<Partial<WishlistItem>> = {
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
        updatedWishlistItemData.errorMessage = `out of stock`;
      }

      // Add error message if the product is being deleted or turn to isPublic.
      if (publicProductDataAfter.isPublic === false || mode === 'delete') {
        updatedWishlistItemData.errorMessage = `no longer available`;
      }

      bigBatch.update(snap.ref, { ...updatedWishlistItemData });
    });

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating wishlist item after product changes', error);
  }
};
