import { Tag } from '@/models/tag/Tag';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface TagData extends Omit<Tag, 'updatedAt'> {
  updatedAt: Timestamp;
}

export const tagConverter = {
  toFirestore: (tag: Tag): DocumentData => {
    return tag;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Tag => {
    const tagData = snapshot.data(options) as TagData;
    return {
      ...tagData,
      tag: snapshot.id,
      updatedAt: tagData.updatedAt.toMillis(),
    };
  },
};
