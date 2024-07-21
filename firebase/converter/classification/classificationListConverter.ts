import { BaseMetadata } from '@/models/classification/BaseMetadata';
import { Brand } from '@/models/classification/brand/Brand';
import { Category } from '@/models/classification/category/Category';
import { Collection } from '@/models/classification/collection/Collection';
import { ClassificationList } from '@/models/classification/ClassificationList';
import { Tag } from '@/models/tag/Tag';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface BaseMetadataData extends Omit<BaseMetadata, 'createdAt' | 'updatedAt' | 'id'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface TagData extends Omit<Tag, 'tag' | 'updatedAt'> {
  updatedAt: Timestamp;
}

type ClassificationListData = {
  [typeAndId: string]: BaseMetadataData | TagData;
};

export const classificationListConverter = {
  toFirestore: (classificationList: ClassificationList): DocumentData => {
    return classificationList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ClassificationList => {
    const BaseClassificationMetadataData = snapshot.data(options) as ClassificationListData;

    const tags: Tag[] = [];
    const brands: Brand[] = [];
    const collections: Collection[] = [];
    const categories: Category[] = [];

    const classificationArray = Object.entries(BaseClassificationMetadataData);

    classificationArray.forEach(([objectKey, value]) => {
      const [type, id] = objectKey.split('_');

      if (type === 'brand') {
        const brandData = { ...value } as BaseMetadataData;
        brands.push({
          ...brandData,
          id,
          createdAt: brandData.createdAt.toMillis(),
          updatedAt: brandData.updatedAt.toMillis(),
        });
      }
      if (type === 'category') {
        const categoryData = { ...value } as BaseMetadataData;
        categories.push({
          ...categoryData,
          id,
          createdAt: categoryData.createdAt.toMillis(),
          updatedAt: categoryData.updatedAt.toMillis(),
        });
      }
      if (type === 'collection') {
        const collectionData = { ...value } as BaseMetadataData;
        collections.push({
          ...collectionData,
          id,
          createdAt: collectionData.createdAt.toMillis(),
          updatedAt: collectionData.updatedAt.toMillis(),
        });
      }
      if (type === 'tag') {
        const tag = id;
        const tagData = { ...value } as TagData;
        tags.push({
          ...tagData,
          tag,
          updatedAt: tagData.updatedAt.toMillis(),
        });
      }
    });

    const classificationList = { brands, categories, collections, tags };

    return classificationList;
  },
};
