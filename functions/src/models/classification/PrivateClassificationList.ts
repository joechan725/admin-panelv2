import { Tag } from '../tag/Tag';
import { PrivateBrand } from './brand/PrivateBrand';
import { PrivateCategory } from './category/PrivateCategory';
import { PrivateCollection } from './collection/PrivateCollection';

export interface PrivateClassificationList {
  brands: PrivateBrand[];
  categories: PrivateCategory[];
  collections: PrivateCollection[];
  tags: Tag[];
}
