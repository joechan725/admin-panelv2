import { Timestamp } from 'firebase-admin/firestore';
import { Comment } from './Comment';
import { ReplyData } from '../reply/ReplyData';

export interface CommentData extends Omit<Comment, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'replies'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
  replies?: (ReplyData & { id: string })[];
}
