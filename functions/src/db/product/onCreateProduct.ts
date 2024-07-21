import * as functions from 'firebase-functions';
import { updateProductCount } from './helpers/updateProductCount';
import { updateProductList } from './helpers/updateProductList';
import { updateTagsCount } from './helpers/updateTagsCount';
import { updateClassificationCount } from './helpers/updateClassificationCount';
import { removeFieldsFormObject } from '../../lib/helpers/object/removeFieldsFormObject';
import { PrivateProductData } from '../../models/product/PrivateProductData';
import { ProductData as PublicProductData } from '../../models/product/ProductData';

export const onCreateProduct = functions.firestore
  .document('products/{productId}')
  .onCreate(async (snapshot, context) => {
    const { productId } = context.params;
    const privateProductData = snapshot.data() as PrivateProductData;
    const publicProductData: PublicProductData = removeFieldsFormObject(privateProductData, ['revenue', 'sales']);

    await updateProductList({
      productId,
      privateProductDataAfter: privateProductData,
      publicProductDataAfter: publicProductData,
      mode: 'create',
    });

    if (privateProductData.isPublic) {
      await updateProductCount({ mode: 'create-public' });
      await updateClassificationCount({
        mode: 'create-public',
        brandIdAfter: privateProductData.brandId,
        categoryIdAfter: privateProductData.categoryId,
        collectionIdAfter: privateProductData.collectionId,
      });
    }

    if (!privateProductData.isPublic) {
      await updateProductCount({ mode: 'create-private' });
      await updateClassificationCount({
        mode: 'create-private',
        brandIdAfter: privateProductData.brandId,
        categoryIdAfter: privateProductData.categoryId,
        collectionIdAfter: privateProductData.collectionId,
      });
    }

    await updateTagsCount({
      mode: 'create',
      tagsAfter: privateProductData.tags,
      productIsPublicAfter: privateProductData.isPublic,
    });
  });
