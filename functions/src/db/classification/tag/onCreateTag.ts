import * as functions from 'firebase-functions';
import { Timestamp } from 'firebase-admin/firestore';
import { updateTagInClassificationList } from './helpers/updateTagInClassificationList';
import { Tag } from '../../../models/tag/Tag';

interface PublicTagData extends Omit<Tag, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const onCreateTag = functions.firestore.document('tags/{tagId}').onCreate(async (snapshot, context) => {
  const { tagId } = context.params;
  const publicTagData = snapshot.data() as PublicTagData;

  await updateTagInClassificationList({ tagId, publicTagData, mode: 'create' });
});
