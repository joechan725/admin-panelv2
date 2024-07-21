import { Tag } from '../tag/Tag';
import { PrivateBrand } from './brand/PrivateBrand';
import { PrivateCategory } from './category/PrivateCategory';
import { PrivateCollection } from './collection/PrivateCollection';

export interface PrivateClassificationList {
  privateBrands: PrivateBrand[];
  privateCategories: PrivateCategory[];
  privateCollections: PrivateCollection[];
  tags: Tag[];
}
