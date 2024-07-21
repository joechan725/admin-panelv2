import * as functions from 'firebase-functions';
import { updateProductsCollection } from './helpers/updateProductsCollection';
import { removeFieldsFormObject } from '../../../lib/helpers/object/removeFieldsFormObject';
import { updateCollectionInClassificationList } from './helpers/updateCollectionInClassificationList';
import { updateCollectionCount } from './helpers/updateCollectionCount';
import { PrivateCollectionData } from '../../../models/classification/collection/PrivateCollectionData';
import { CollectionData as PublicCollectionData } from '../../../models/classification/collection/CollectionData';
import { addDeletedCollection } from './helpers/addDeletedCollection';

export const onUpdateCollection = functions.firestore
  .document('collections/{collectionId}')
  .onUpdate(async (change, context) => {
    const { collectionId } = context.params;

    const collectionSnapBefore = change.before;
    const collectionSnapAfter = change.after;

    const privateCollectionDataBefore = collectionSnapBefore.data() as PrivateCollectionData;
    const privateCollectionDataAfter = collectionSnapAfter.data() as PrivateCollectionData;

    const publicCollectionDataAfter: PublicCollectionData = removeFieldsFormObject(privateCollectionDataAfter, [
      'revenue',
      'sales',
    ]);
    if (privateCollectionDataAfter.deletedAt === undefined) {
      // The collection is updated
      await updateCollectionInClassificationList({
        collectionId,
        privateCollectionData: privateCollectionDataAfter,
        publicCollectionData: publicCollectionDataAfter,
        mode: 'update',
      });

      if (
        privateCollectionDataBefore.nameZH !== privateCollectionDataAfter.nameZH ||
        privateCollectionDataBefore.nameEN !== privateCollectionDataAfter.nameEN
      ) {
        await updateProductsCollection({ collectionId, collectionData: publicCollectionDataAfter, mode: 'update' });
      }
    }

    if (privateCollectionDataBefore.deletedAt === undefined && privateCollectionDataAfter.deletedAt !== undefined) {
      // The collection is deleted
      await updateCollectionInClassificationList({
        collectionId,
        privateCollectionData: privateCollectionDataAfter,
        publicCollectionData: privateCollectionDataAfter,
        mode: 'delete',
      });

      await updateProductsCollection({ collectionId, collectionData: privateCollectionDataAfter, mode: 'delete' });

      await updateCollectionCount({ mode: 'delete' });

      await addDeletedCollection({ collectionId, collectionData: privateCollectionDataAfter });
    }
  });
