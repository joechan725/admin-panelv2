import * as functions from 'firebase-functions';
import { updateCollectionCount } from './helpers/updateCollectionCount';
import { updateCollectionInClassificationList } from './helpers/updateCollectionInClassificationList';
import { removeFieldsFormObject } from '../../../lib/helpers/object/removeFieldsFormObject';
import { PrivateCollectionData } from '../../../models/classification/collection/PrivateCollectionData';
import { CollectionData as PublicCollectionData } from '../../../models/classification/collection/CollectionData';

export const onCreateCollection = functions.firestore
  .document('collections/{collectionId}')
  .onCreate(async (snapshot, context) => {
    const { collectionId } = context.params;
    const privateCollectionData = snapshot.data() as PrivateCollectionData;
    const publicCollectionData: PublicCollectionData = removeFieldsFormObject(privateCollectionData, [
      'revenue',
      'sales',
    ]);

    await updateCollectionInClassificationList({
      collectionId,
      privateCollectionData,
      publicCollectionData,
      mode: 'create',
    });

    await updateCollectionCount({ mode: 'create' });
  });
