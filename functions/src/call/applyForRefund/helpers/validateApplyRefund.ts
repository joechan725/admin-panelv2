import { HttpsError } from 'firebase-functions/v2/https';
import { applyRefundSchema } from '../../../schema/applyRefundSchema';
import { Image } from '../../../models/Image';
import { imageSchema } from '../../../schema/imageSchema';

interface ValidityApplyRefundParameters {
  formData: unknown;
  images: Image[];
}

/**
 * Validity the order placement
 *
 * @param formData - The order refund application data
 * @param images - The images associated with the refund application
 *
 * @returns The promise of void
 */

export const validateApplyRefund = async ({ formData, images }: ValidityApplyRefundParameters) => {
  try {
    // Check the applyRefund type
    applyRefundSchema.parse(formData);

    // Validate each image in the images array
    images.forEach((image) => imageSchema.parse(image));
  } catch (error) {
    throw new HttpsError('invalid-argument', 'Invalid form data submitted');
  }
};
