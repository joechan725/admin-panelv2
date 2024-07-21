import { Image } from '../Image';

export interface Product {
  id: string;
  nameEN: string;
  nameZH: string;
  isPublic: boolean;
  descriptionZH?: string;
  descriptionEN?: string;
  images?: Image[];
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
  tags: string[];
  detailZH?: string;
  detailEN?: string;
  detailImages?: Image[];
  // TimeStamp
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
  // comment
  commentCount?: number;
  rating?: number;
  ratingsBrakeDown?: {
    5?: number;
    4?: number;
    3?: number;
    2?: number;
    1?: number;
  };
}
