import { Tag } from '../tag/Tag';
import { Brand } from './brand/Brand';
import { Category } from './category/Category';
import { Collection } from './collection/Collection';

export interface ClassificationList {
  brands: Brand[];
  categories: Category[];
  collections: Collection[];
  tags: Tag[];
}
