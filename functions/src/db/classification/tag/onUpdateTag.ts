import * as functions from 'firebase-functions';
import { Timestamp } from 'firebase-admin/firestore';
import { updateTagInClassificationList } from './helpers/updateTagInClassificationList';
import { Tag } from '../../../models/tag/Tag';

interface PublicTagData extends Omit<Tag, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const onUpdateTag = functions.firestore.document('tags/{tagId}').onUpdate(async (change, context) => {
  const { tagId } = context.params;

  const publicTagSnapAfter = change.after;

  const publicTagDataAfter = publicTagSnapAfter.data() as PublicTagData;

  await updateTagInClassificationList({ tagId, publicTagData: publicTagDataAfter, mode: 'update' });
});
