import * as functions from 'firebase-functions';
import { updateCategoryInClassificationList } from './helpers/updateCategoryInClassificationList';
import { updateCategoryCount } from './helpers/updateCategoryCount';
import { removeFieldsFormObject } from '../../../lib/helpers/object/removeFieldsFormObject';
import { PrivateCategoryData } from '../../../models/classification/category/PrivateCategoryData';
import { CategoryData as PublicCategoryData } from '../../../models/classification/category/CategoryData';

export const onCreateCategory = functions.firestore
  .document('categories/{categoryId}')
  .onCreate(async (snapshot, context) => {
    const { categoryId } = context.params;
    const privateCategoryData = snapshot.data() as PrivateCategoryData;
    const publicCategoryData: PublicCategoryData = removeFieldsFormObject(privateCategoryData, ['revenue', 'sales']);

    await updateCategoryInClassificationList({ categoryId, privateCategoryData, publicCategoryData, mode: 'create' });

    await updateCategoryCount({ mode: 'create' });
  });
