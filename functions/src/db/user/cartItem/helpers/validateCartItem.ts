import { logger } from 'firebase-functions/v1';
import { CartItemData } from '../../../../models/user/cartItem/CartItemData';
import { cartItemSchema } from '../../../../schema/cartItemSchema';
import { DocumentData, DocumentReference } from 'firebase-admin/firestore';

interface ValidityCartItemParameters {
  cartItemRef: DocumentReference<DocumentData>;
  cartItemData: CartItemData;
}

/**
 * Validity the cartItem and delete it if checking fails
 *
 * @param cartItemRef - The reference of cartItem
 * @param cartItemData - The firestore cartItem data
 *
 * @returns The promise of { isValid: boolean }
 */

export const validateCartItem = async ({ cartItemRef, cartItemData }: ValidityCartItemParameters) => {
  try {
    // Check the cartItem type
    cartItemSchema.parse(cartItemData);
    return { isValid: true };
  } catch (error) {
    // The cartItem failed the checking
    try {
      // Delete cartItem from the database
      await cartItemRef.delete();
    } catch (error) {
      logger.error('Error on deleting invalid cartItem', error);
    }
    return { isValid: false };
  }
};
