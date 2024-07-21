import { Image } from '../../Image';

export interface WishlistItem {
  id: string;

  // product
  productId: string;
  nameZH: string;
  nameEN: string;
  descriptionZH?: string;
  descriptionEN?: string;
  image?: Image;
  sellingPrice?: number;
  markedPrice: number;
  stock: number;
  collectionId?: string;
  collectionNameZH?: string;
  collectionNameEN?: string;
  brandId?: string;
  brandNameZH?: string;
  brandNameEN?: string;
  categoryId?: string;
  categoryNameZH?: string;
  categoryNameEN?: string;
  commentCount?: number;
  rating?: number;

  // timestamp
  createdAt: number;
  updatedAt: number;

  // error
  errorMessage?: 'no longer available' | 'out of stock';
}
