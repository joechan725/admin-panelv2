import { Image } from '../../Image';

export interface AddToCartRecord {
  userId: string;
  productId: string;
  productNameZH: string;
  productNameEN: string;
  productDescriptionZH?: string;
  productDescriptionEN?: string;
  productImage?: Image;
}
