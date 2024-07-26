import { logger } from 'firebase-functions/v1';
import { AddressData } from '../../../../models/AddressData';
import { addressSchema } from '../../../../schema/addressSchema';
import { DocumentData, DocumentReference } from 'firebase-admin/firestore';

interface ValidityAddressParameters {
  addressRef: DocumentReference<DocumentData>;
  addressData: AddressData;
}

/**
 * Validity the address and delete it if checking fails
 *
 * @param addressRef - The reference of address
 * @param addressData - The firestore address data
 *
 * @returns The promise of { isValid: boolean }
 */

export const validateAddress = async ({ addressRef, addressData }: ValidityAddressParameters) => {
  try {
    // Check the address type
    addressSchema.parse(addressData);
    return { isValid: true };
  } catch (error) {
    // The address failed the checking
    try {
      // Delete address from the database
      await addressRef.delete();
    } catch (error) {
      logger.error('Error on deleting invalid address', error);
    }
    return { isValid: false };
  }
};
