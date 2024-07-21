import * as functions from 'firebase-functions';
import { updateProductsCategory } from './helpers/updateProductsCategory';
import { updateCategoryInClassificationList } from './helpers/updateCategoryInClassificationList';
import { removeFieldsFormObject } from '../../../lib/helpers/object/removeFieldsFormObject';
import { updateCategoryCount } from './helpers/updateCategoryCount';
import { PrivateCategoryData } from '../../../models/classification/category/PrivateCategoryData';
import { CategoryData as PublicCategoryData } from '../../../models/classification/category/CategoryData';
import { addDeletedCategory } from './helpers/addDeletedCategory';

export const onUpdateCategory = functions.firestore
  .document('categories/{categoryId}')
  .onUpdate(async (change, context) => {
    const { categoryId } = context.params;

    const categorySnapBefore = change.before;
    const categorySnapAfter = change.after;

    const privateCategoryDataBefore = categorySnapBefore.data() as PrivateCategoryData;
    const privateCategoryDataAfter = categorySnapAfter.data() as PrivateCategoryData;

    const publicCategoryDataAfter: PublicCategoryData = removeFieldsFormObject(privateCategoryDataAfter, [
      'revenue',
      'sales',
    ]);

    if (privateCategoryDataAfter.deletedAt === undefined) {
      // The category is updated
      await updateCategoryInClassificationList({
        categoryId,
        privateCategoryData: privateCategoryDataAfter,
        publicCategoryData: publicCategoryDataAfter,
        mode: 'update',
      });

      if (
        privateCategoryDataBefore.nameZH !== privateCategoryDataAfter.nameZH ||
        privateCategoryDataBefore.nameEN !== privateCategoryDataAfter.nameEN
      ) {
        await updateProductsCategory({ categoryId, categoryData: publicCategoryDataAfter, mode: 'update' });
      }
    }

    if (privateCategoryDataBefore.deletedAt === undefined && privateCategoryDataAfter.deletedAt !== undefined) {
      // The category is deleted
      await updateCategoryInClassificationList({
        categoryId,
        privateCategoryData: privateCategoryDataAfter,
        publicCategoryData: privateCategoryDataAfter,
        mode: 'delete',
      });

      await updateProductsCategory({ categoryId, categoryData: privateCategoryDataAfter, mode: 'delete' });

      await updateCategoryCount({ mode: 'delete' });

      await addDeletedCategory({ categoryId, categoryData: privateCategoryDataAfter });
    }
  });
