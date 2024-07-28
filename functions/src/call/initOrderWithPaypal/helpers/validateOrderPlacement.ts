import { HttpsError } from 'firebase-functions/v2/https';
import { orderPlacementSchema } from '../../../schema/orderPlacementSchema';

interface ValidityOrderPlacementParameters {
  orderPlacementData: unknown;
}

/**
 * Validity the order placement
 *
 * @param orderPlacementData - The order placement form data
 *
 * @returns void
 */

export const validateOrderPlacement = ({ orderPlacementData }: ValidityOrderPlacementParameters) => {
  try {
    // Check the orderPlacement type
    orderPlacementSchema.parse(orderPlacementData);
  } catch (error) {
    throw new HttpsError('invalid-argument', 'Invalid form data submitted');
  }
};
