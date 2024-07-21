import { Timestamp } from 'firebase-admin/firestore';
import { UserData } from './UserData';

export interface UserListData {
  users: (UserData & { id: string })[];
  ids: string[];
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
