import { logger } from 'firebase-functions/v1';
import { WishlistItemData } from '../../../../models/user/wishlistItem/WishlistItemData';
import { wishlistItemSchema } from '../../../../schema/wishlistItemSchema';
import { DocumentData, DocumentReference } from 'firebase-admin/firestore';

interface ValidityWishlistItemParameters {
  wishlistItemRef: DocumentReference<DocumentData>;
  wishlistItemData: WishlistItemData;
}

/**
 * Validity the wishlistItem and delete it if checking fails
 *
 * @param wishlistItemRef - The reference of wishlistItem
 * @param wishlistItemData - The firestore wishlistItem data
 *
 * @returns The promise of { isValid: boolean }
 */

export const validateWishlistItem = async ({ wishlistItemRef, wishlistItemData }: ValidityWishlistItemParameters) => {
  try {
    // Check the wishlistItem type
    wishlistItemSchema.parse(wishlistItemData);
    return { isValid: true };
  } catch (error) {
    // The wishlistItem failed the checking
    try {
      // Delete wishlistItem from the database
      await wishlistItemRef.delete();
    } catch (error) {
      logger.error('Error on deleting invalid wishlistItem', error);
    }
    return { isValid: false };
  }
};
