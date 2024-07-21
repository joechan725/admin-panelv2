import { Product } from './Product';

export interface PrivateProduct extends Product {
  // statistics
  revenue?: number;
  sales?: number;
}
