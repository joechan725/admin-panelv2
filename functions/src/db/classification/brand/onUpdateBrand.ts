import * as functions from 'firebase-functions';
import { updateBrandInClassificationList } from './helpers/updateBrandInClassificationList';
import { updateProductsBrand } from './helpers/updateProductsBrand';
import { removeFieldsFormObject } from '../../../lib/helpers/object/removeFieldsFormObject';
import { updateBrandCount } from './helpers/updateBrandCount';
import { PrivateBrandData } from '../../../models/classification/brand/PrivateBrandData';
import { BrandData as PublicBrandData } from '../../../models/classification/brand/BrandData';
import { addDeletedBrand } from './helpers/addDeletedBrand';

export const onUpdateBrand = functions.firestore.document('brands/{brandId}').onUpdate(async (change, context) => {
  const { brandId } = context.params;

  const brandSnapBefore = change.before;
  const brandSnapAfter = change.after;

  const privateBrandDataBefore = brandSnapBefore.data() as PrivateBrandData;
  const privateBrandDataAfter = brandSnapAfter.data() as PrivateBrandData;

  // const publicBrandDataBefore: PublicBrandData = removeFieldsFormObject(privateBrandDataBefore, ['revenue', 'sales']);
  const publicBrandDataAfter: PublicBrandData = removeFieldsFormObject(privateBrandDataAfter, ['revenue', 'sales']);

  if (privateBrandDataAfter.deletedAt === undefined) {
    // The brand is updated
    await updateBrandInClassificationList({
      brandId,
      privateBrandData: privateBrandDataAfter,
      publicBrandData: publicBrandDataAfter,
      mode: 'update',
    });

    if (
      privateBrandDataBefore.nameEN !== privateBrandDataAfter.nameEN ||
      privateBrandDataBefore.nameZH !== privateBrandDataAfter.nameZH
    ) {
      await updateProductsBrand({ brandId, brandData: privateBrandDataAfter, mode: 'update' });
    }
  }

  if (privateBrandDataBefore.deletedAt === undefined && privateBrandDataAfter.deletedAt !== undefined) {
    // The brand is deleted
    await updateBrandInClassificationList({
      brandId,
      privateBrandData: privateBrandDataAfter,
      publicBrandData: privateBrandDataAfter,
      mode: 'delete',
    });

    await updateProductsBrand({ brandId, brandData: privateBrandDataAfter, mode: 'delete' });

    await updateBrandCount({ mode: 'delete' });

    await addDeletedBrand({ brandId, brandData: privateBrandDataAfter });
  }
});
