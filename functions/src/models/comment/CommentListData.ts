import { Timestamp } from 'firebase-admin/firestore';
import { CommentData } from './CommentData';

export interface CommentListData {
  comments: (CommentData & { id: string })[];
  ids: string[];
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
