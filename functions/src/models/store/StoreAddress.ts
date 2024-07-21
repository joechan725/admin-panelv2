import { District } from '../../types/District';
import { Region } from '../../types/Region';
import { Image } from '../Image';

export interface StoreAddress {
  id: string;
  name: string;
  region: Region;
  district: District;
  detailAddress: string;
  phoneNumber: string;
  businessHours: string;

  images: Image[];

  // timestamp
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
