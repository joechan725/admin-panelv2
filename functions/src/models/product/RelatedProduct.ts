import { Image } from '../Image';

export interface RelatedProduct {
  id: string;
  nameZH: string;
  nameEN: string;
  descriptionZH?: string;
  descriptionEN?: string;
  sellingPrice?: number;
  markedPrice: number;
  image?: Image;
}
