import * as functions from 'firebase-functions';
import { updateBrandInClassificationList } from './helpers/updateBrandInClassificationList';
import { updateBrandCount } from './helpers/updateBrandCount';
import { removeFieldsFormObject } from '../../../lib/helpers/object/removeFieldsFormObject';
import { PrivateBrandData } from '../../../models/classification/brand/PrivateBrandData';
import { BrandData as PublicBrandData } from '../../../models/classification/brand/BrandData';

export const onCreateBrand = functions.firestore.document('brands/{brandId}').onCreate(async (snapshot, context) => {
  const { brandId } = context.params;
  const privateBrandData = snapshot.data() as PrivateBrandData;
  const publicBrandData: PublicBrandData = removeFieldsFormObject(privateBrandData, ['revenue', 'sales']);

  await updateBrandInClassificationList({ brandId, privateBrandData, publicBrandData, mode: 'create' });

  await updateBrandCount({ mode: 'create' });
});
