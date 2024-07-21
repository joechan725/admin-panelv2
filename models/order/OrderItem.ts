import { Image } from '../Image';

export interface OrderItem {
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

  // quantity
  quantity: number;

  commentId?: string;
}
