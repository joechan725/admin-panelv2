import { BasePrivateMetadata } from '@/models/classification/BasePrivateMetadata';
import { Brand } from '@/models/classification/brand/Brand';
import { Category } from '@/models/classification/category/Category';
import { Collection } from '@/models/classification/collection/Collection';
import { PrivateClassificationList } from '@/models/classification/PrivateClassificationList';
import { Tag } from '@/models/tag/Tag';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface BasePrivateMetadataData extends Omit<BasePrivateMetadata, 'createdAt' | 'updatedAt' | 'id'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface TagData extends Omit<Tag, 'tag' | 'updatedAt'> {
  updatedAt: Timestamp;
}

type ResolveType<K> = K extends `brand_${string}` | `collection_${string}` | `category_${string}`
  ? BasePrivateMetadataData
  : TagData;

type PrivateClassificationListData = {
  [K in `brand_${string}` | `collection_${string}` | `category_${string}` | `tag_${string}`]: ResolveType<K>;
};

export const privateClassificationListConverter = {
  toFirestore: (classification: PrivateClassificationList): DocumentData => {
    return classification;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): PrivateClassificationList => {
    const BaseClassificationMetadataData = snapshot.data(options) as PrivateClassificationListData;

    const tags: Tag[] = [];
    const privateBrands: Brand[] = [];
    const privateCollections: Collection[] = [];
    const privateCategories: Category[] = [];

    const classificationArray = Object.entries(BaseClassificationMetadataData);

    classificationArray.forEach(([key, value]) => {
      if (key.startsWith('brand_')) {
        const id = key.split('_').at(-1) ?? '';
        const brandData = { ...value } as BasePrivateMetadataData;
        privateBrands.push({
          ...brandData,
          id,
          createdAt: brandData.createdAt.toMillis(),
          updatedAt: brandData.updatedAt.toMillis(),
        });
      }
      if (key.startsWith('category_')) {
        const id = key.split('_').at(-1) ?? '';
        const categoryData = { ...value } as BasePrivateMetadataData;
        privateCategories.push({
          ...categoryData,
          id,
          createdAt: categoryData.createdAt.toMillis(),
          updatedAt: categoryData.updatedAt.toMillis(),
        });
      }
      if (key.startsWith('collection_')) {
        const id = key.split('_').at(-1) ?? '';
        const collectionData = { ...value } as BasePrivateMetadataData;
        privateCollections.push({
          ...collectionData,
          id,
          createdAt: collectionData.createdAt.toMillis(),
          updatedAt: collectionData.updatedAt.toMillis(),
        });
      }
      if (key.startsWith('tag_')) {
        const tag = key.split('_').at(-1) ?? '';
        const tagData = { ...value } as TagData;
        tags.push({
          ...tagData,
          tag,
          updatedAt: tagData.updatedAt.toMillis(),
        });
      }
    });

    const classificationList = { privateBrands, privateCategories, privateCollections, tags };

    return classificationList;
  },
};
