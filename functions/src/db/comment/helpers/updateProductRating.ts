import { Product } from '../../../models/product/Product';
import { FieldValue } from 'firebase-admin/firestore';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { ProductData } from '../../../models/product/ProductData';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

type UpdateProductRatingParameters = CreateModeParameters | UpdateModeParameters | DeleteModeParameters;

type Rating = 1 | 2 | 3 | 4 | 5;

interface CreateModeParameters {
  mode: 'create';
  ratingBefore?: undefined;
  ratingAfter: Rating;
  productId: string;
}

interface UpdateModeParameters {
  mode: 'update';
  ratingBefore: Rating;
  ratingAfter: Rating;
  productId: string;
}

interface DeleteModeParameters {
  mode: 'delete';
  ratingBefore: Rating;
  ratingAfter?: undefined;
  productId: string;
}

/**
 * Update the rating of the product when the comment is create / update / delete
 *
 * @param ratingAfter - The rating of the comment of the product
 * @param ratingBefore - The rating of the comment of the product before the comment is updated.
 * Required when the mode is 'update'
 * @param mode - 'create' | 'update' | 'delete'
 * @param productId - The id of the product being commented.
 * @returns The promise of void
 */

export const updateProductRating = async ({
  mode,
  productId,
  ratingAfter,
  ratingBefore,
}: UpdateProductRatingParameters) => {
  try {
    const productRef = db.collection('products').doc(productId);
    const productSnap = await productRef.get();
    const productData = productSnap.data() as ProductData;

    const product: Product = {
      ...productData,
      id: productSnap.id,
      createdAt: productData.createdAt.toMillis(),
      updatedAt: productData.updatedAt.toMillis(),
      deletedAt: productData.deletedAt?.toMillis(),
    };

    const previousRatingsBrakeDown = product.ratingsBrakeDown;

    if (mode === 'create') {
      const previousRatingsCount = previousRatingsBrakeDown?.[ratingAfter] ?? 0;
      const newRatingCount = previousRatingsCount + 1;
      const newRatingsBrakeDown = {
        ...previousRatingsBrakeDown,
        [ratingAfter]: newRatingCount,
      };

      const newRatingsBrakeDownArray = Object.entries(newRatingsBrakeDown);

      const newTotalRating = newRatingsBrakeDownArray.reduce(
        (accumulator, ratingBrakeDown) => (accumulator += +ratingBrakeDown[0] * +ratingBrakeDown[1]),
        0
      );
      const newTotalCommentCount = newRatingsBrakeDownArray.reduce(
        (accumulator, ratingBrakeDown) => (accumulator += +ratingBrakeDown[1]),
        0
      );
      const newRating = newTotalRating / newTotalCommentCount;

      const updateProduct: ExtendWithFieldValue<Partial<Product>> = {
        rating: newRating,
        ratingsBrakeDown: newRatingsBrakeDown,
        commentCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      await productRef.update(updateProduct);
    }

    if (mode === 'delete') {
      const previousRatingsCount = previousRatingsBrakeDown?.[ratingBefore] ?? 0;
      const newRatingCount = previousRatingsCount - 1;
      const newRatingsBrakeDown = {
        ...previousRatingsBrakeDown,
        [ratingBefore]: newRatingCount,
      };

      const newRatingsBrakeDownArray = Object.entries(newRatingsBrakeDown);

      const newTotalRating = newRatingsBrakeDownArray.reduce(
        (accumulator, ratingBrakeDown) => (accumulator += +ratingBrakeDown[0] * +ratingBrakeDown[1]),
        0
      );
      const newTotalCommentCount = newRatingsBrakeDownArray.reduce(
        (accumulator, ratingBrakeDown) => (accumulator += +ratingBrakeDown[1]),
        0
      );
      const newRating = newTotalRating / newTotalCommentCount;

      const updateProduct: ExtendWithFieldValue<Partial<Product>> = {
        rating: newRating,
        ratingsBrakeDown: newRatingsBrakeDown,
        commentCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      await productRef.update(updateProduct);
    }

    if (mode === 'update') {
      const previousRatingsCountAfter = previousRatingsBrakeDown ? previousRatingsBrakeDown[ratingAfter] ?? 0 : 0;
      const previousRatingsCountBefore = previousRatingsBrakeDown ? previousRatingsBrakeDown[ratingBefore] ?? 0 : 0;
      const newRatingCountAfter = previousRatingsCountAfter + 1;
      const newRatingCountBefore = previousRatingsCountBefore - 1;

      const newRatingsBrakeDown = {
        ...previousRatingsBrakeDown,
        [ratingAfter]: newRatingCountAfter,
        [ratingBefore]: newRatingCountBefore,
      };

      const newRatingsBrakeDownArray = Object.entries(newRatingsBrakeDown);

      const newRating = newRatingsBrakeDownArray.reduce(
        (accumulator, ratingBrakeDown) => (accumulator += +ratingBrakeDown[0] * +ratingBrakeDown[1]),
        0
      );

      const updateProduct: ExtendWithFieldValue<Partial<Product>> = {
        rating: newRating,
        ratingsBrakeDown: newRatingsBrakeDown,
        updatedAt: FieldValue.serverTimestamp(),
      };

      await productRef.update(updateProduct);
    }
  } catch (error) {
    logger.error('Error on updating product rating', error);
  }
};
