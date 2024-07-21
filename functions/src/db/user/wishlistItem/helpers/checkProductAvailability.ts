import { DocumentData, DocumentReference, FieldValue } from 'firebase-admin/firestore';
import { ExtendWithFieldValue } from '../../../../types/ExtendWithFieldValue';
import { WishlistItem } from '../../../../models/user/wishlistItem/WishlistItem';
import { WishlistItemData } from '../../../../models/user/wishlistItem/WishlistItemData';
import { ProductData } from '../../../../models/product/ProductData';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface CheckProductAvailabilityParameter {
  wishlistItemData: WishlistItemData;
  wishlistItemRef: DocumentReference<DocumentData>;
}

interface UpdateWishlistItemData
  extends ExtendWithFieldValue<Partial<Omit<WishlistItem, 'id' | 'createdAt' | 'updatedAt' | 'product'>>> {
  product?: ProductData & { id: string };
  updatedAt: FieldValue;
}

/**
 * Check the availability of product when the wishlist item is written.
 *
 * @param wishlistItemRef - The document reference of wishlistItem.
 * @param wishlistItem The wishlistItem data.
 * @returns The promise of boolean (if the checking pass).
 */

export const checkProductAvailability = async ({
  wishlistItemData,
  wishlistItemRef,
}: CheckProductAvailabilityParameter) => {
  try {
    const previousErrorMessage = wishlistItemData.errorMessage;

    let newErrorMessage: WishlistItem['errorMessage'] = undefined;

    // Get the product data
    const productRef = db.collection('products').doc(wishlistItemData.productId);

    const productSnap = await productRef.get();

    if (!productSnap.exists) {
      newErrorMessage = 'no longer available';
      const wishlistItemData: UpdateWishlistItemData = {
        errorMessage: newErrorMessage,
        updatedAt: FieldValue.serverTimestamp(),
      };
      await wishlistItemRef.update({ ...wishlistItemData });
      return { runRemainingCode: false };
    }

    const foundProductData = productSnap.data() as ProductData;

    if (foundProductData.stock <= 0) {
      newErrorMessage = 'out of stock';
    }

    if (foundProductData.isPublic === false) {
      newErrorMessage = 'no longer available';
    }

    if (
      previousErrorMessage !== newErrorMessage ||
      wishlistItemData.sellingPrice !== foundProductData.sellingPrice ||
      wishlistItemData.markedPrice !== foundProductData.markedPrice ||
      wishlistItemData.nameEN !== foundProductData.nameEN ||
      wishlistItemData.nameZH !== foundProductData.nameZH ||
      wishlistItemData.rating !== foundProductData.rating ||
      wishlistItemData.image?.url !== foundProductData.images?.[0].url ||
      wishlistItemData.descriptionEN !== foundProductData.descriptionEN ||
      wishlistItemData.descriptionZH !== foundProductData.descriptionZH
    ) {
      const wishlistItemData: UpdateWishlistItemData = {
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
      await wishlistItemRef.update({ ...wishlistItemData });
      return { runRemainingCode: false };
    }
    return { runRemainingCode: true };
  } catch (error) {
    logger.error("Error on checking product's availability for wishlist item", error);
    return { runRemainingCode: true };
  }
};
