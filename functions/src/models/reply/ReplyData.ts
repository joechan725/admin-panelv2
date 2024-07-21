import { Timestamp } from 'firebase-admin/firestore';
import { Reply } from './Reply';

export interface ReplyData extends Omit<Reply, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
