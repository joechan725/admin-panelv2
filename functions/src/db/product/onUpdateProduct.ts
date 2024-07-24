import * as functions from 'firebase-functions';
import { updateCartItems } from './helpers/updateCartItems';
import { updateProductCount } from './helpers/updateProductCount';
import { updateProductList } from './helpers/updateProductList';
import { updateTagsCount } from './helpers/updateTagsCount';
import { updateClassificationCount } from './helpers/updateClassificationCount';
import { removeFieldsFormObject } from '../../lib/helpers/object/removeFieldsFormObject';
import { PrivateProductData } from '../../models/product/PrivateProductData';
import { ProductData as PublicProductData } from '../../models/product/ProductData';
import { sendBackInStockEmailsAndNotifications } from './helpers/sendBackInStockEmailsAndNotifications';
import { updateWishlistItems } from './helpers/updateWishItems';
import { addDeletedProduct } from './helpers/addDeletedProduct';

export const onUpdateProduct = functions.firestore
  .document('products/{productId}')
  .onUpdate(async (change, context) => {
    const { productId } = context.params;
    // get data before and after changes
    const productSnapBefore = change.before;
    const productSnapAfter = change.after;

    const privateProductDataBefore = productSnapBefore.data() as PrivateProductData;
    const privateProductDataAfter = productSnapAfter.data() as PrivateProductData;

    const publicProductDataBefore: PublicProductData = removeFieldsFormObject(privateProductDataBefore, [
      'revenue',
      'sales',
    ]);
    const publicProductDataAfter: PublicProductData = removeFieldsFormObject(privateProductDataAfter, [
      'revenue',
      'sales',
    ]);

    if (privateProductDataAfter.deletedAt === undefined) {
      // The product is update
      // update the privateProductCollection
      await updateProductList({
        productId,
        publicProductDataBefore,
        privateProductDataBefore,
        publicProductDataAfter,
        privateProductDataAfter,
        mode: 'update',
      });

      // Send the product restock email if the product is back in stock and public
      if (
        privateProductDataBefore.stock <= 0 &&
        privateProductDataAfter.stock > 0 &&
        privateProductDataAfter.isPublic
      ) {
        await sendBackInStockEmailsAndNotifications({ productData: privateProductDataAfter, productId });
      }

      // Update the classification count
      if (privateProductDataBefore.isPublic === privateProductDataAfter.isPublic) {
        if (privateProductDataAfter.isPublic) {
          await updateClassificationCount({
            mode: 'unchanged-public',
            brandIdBefore: privateProductDataBefore.brandId,
            brandIdAfter: privateProductDataAfter.brandId,
            categoryIdBefore: privateProductDataBefore.categoryId,
            categoryIdAfter: privateProductDataAfter.categoryId,
            collectionIdBefore: privateProductDataBefore.collectionId,
            collectionIdAfter: privateProductDataAfter.collectionId,
          });
        }
        if (!privateProductDataAfter.isPublic) {
          await updateClassificationCount({
            mode: 'unchanged-private',
            brandIdBefore: privateProductDataBefore.brandId,
            brandIdAfter: privateProductDataAfter.brandId,
            categoryIdBefore: privateProductDataBefore.categoryId,
            categoryIdAfter: privateProductDataAfter.categoryId,
            collectionIdBefore: privateProductDataBefore.collectionId,
            collectionIdAfter: privateProductDataAfter.collectionId,
          });
        }
      }

      if (!privateProductDataBefore.isPublic && privateProductDataAfter.isPublic) {
        await updateProductCount({ mode: 'change-to-public' });
        await updateClassificationCount({
          mode: 'change-to-public',
          brandIdBefore: privateProductDataBefore.brandId,
          brandIdAfter: privateProductDataAfter.brandId,
          categoryIdBefore: privateProductDataBefore.categoryId,
          categoryIdAfter: privateProductDataAfter.categoryId,
          collectionIdBefore: privateProductDataBefore.collectionId,
          collectionIdAfter: privateProductDataAfter.collectionId,
        });
      }

      if (privateProductDataBefore.isPublic && !privateProductDataAfter.isPublic) {
        await updateProductCount({ mode: 'change-to-private' });
        await updateClassificationCount({
          mode: 'change-to-private',
          brandIdBefore: privateProductDataBefore.brandId,
          brandIdAfter: privateProductDataAfter.brandId,
          categoryIdBefore: privateProductDataBefore.categoryId,
          categoryIdAfter: privateProductDataAfter.categoryId,
          collectionIdBefore: privateProductDataBefore.collectionId,
          collectionIdAfter: privateProductDataAfter.collectionId,
        });
      }

      await updateCartItems({ publicProductDataAfter, publicProductDataBefore, productId, mode: 'update' });

      await updateWishlistItems({ publicProductDataAfter, publicProductDataBefore, productId, mode: 'update' });

      await updateTagsCount({
        mode: 'update',
        tagsBefore: privateProductDataBefore.tags,
        tagsAfter: privateProductDataAfter.tags,
        productIsPublicBefore: privateProductDataBefore.isPublic,
        productIsPublicAfter: privateProductDataAfter.isPublic,
      });
    }

    if (privateProductDataAfter.deletedAt !== undefined) {
      // The product is deleted
      await updateProductList({
        productId,
        privateProductDataBefore,
        publicProductDataBefore,
        mode: 'delete',
      });

      if (privateProductDataAfter.isPublic) {
        await updateProductCount({ mode: 'delete-public' });
        await updateClassificationCount({
          mode: 'delete-public',
          brandIdBefore: privateProductDataBefore.brandId,
          categoryIdBefore: privateProductDataBefore.categoryId,
          collectionIdBefore: privateProductDataBefore.collectionId,
        });
      }

      if (!privateProductDataAfter.isPublic) {
        await updateProductCount({ mode: 'delete-private' });
        await updateClassificationCount({
          mode: 'delete-private',
          brandIdBefore: privateProductDataBefore.brandId,
          categoryIdBefore: privateProductDataBefore.categoryId,
          collectionIdBefore: privateProductDataBefore.collectionId,
        });
      }

      await updateCartItems({ publicProductDataAfter, productId, mode: 'delete' });

      await updateWishlistItems({ publicProductDataAfter, productId, mode: 'delete' });

      await updateTagsCount({
        mode: 'delete',
        tagsAfter: privateProductDataAfter.tags,
        productIsPublicAfter: privateProductDataAfter.isPublic,
      });

      await addDeletedProduct({ productId, productData: privateProductDataAfter });
    }
  });
