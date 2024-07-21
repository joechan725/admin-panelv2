import { BaseMetadata } from '@/models/classification/BaseMetadata';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface BaseMetadataData extends Omit<BaseMetadata, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const classificationConverter = {
  toFirestore: (classification: BaseMetadata): DocumentData => {
    return classification;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): BaseMetadata => {
    const BaseClassificationMetadataData = snapshot.data(options) as BaseMetadataData;

    return {
      ...BaseClassificationMetadataData,
      id: snapshot.id,
      createdAt: BaseClassificationMetadataData.createdAt.toMillis(),
      updatedAt: BaseClassificationMetadataData.updatedAt.toMillis(),
    };
  },
};
