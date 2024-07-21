export interface BaseMetadata {
  id: string;
  nameZH: string;
  nameEN: string;

  // product count
  totalProductCount?: number;
  privateProductCount?: number;
  publicProductCount?: number;

  // Timestamp
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
