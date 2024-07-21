import { BasePrivateMetadata } from '@/models/classification/BasePrivateMetadata';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface BasePrivateMetadataData extends Omit<BasePrivateMetadata, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const privateClassificationConverter = {
  toFirestore: (privateClassification: BasePrivateMetadata): DocumentData => {
    return privateClassification;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): BasePrivateMetadata => {
    const classificationData = snapshot.data(options) as BasePrivateMetadataData;

    return {
      ...classificationData,
      id: snapshot.id,
      createdAt: classificationData.createdAt.toMillis(),
      updatedAt: classificationData.updatedAt.toMillis(),
    };
  },
};
