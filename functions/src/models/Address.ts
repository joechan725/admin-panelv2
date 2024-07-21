import { District } from '../types/District';
import { Region } from '../types/Region';

export interface Address {
  id: string;
  remark?: string;
  region: Region;
  district: District;
  detailAddress: string;
  contactName: string;
  contactPhoneNumber: string;

  // timestamp
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
