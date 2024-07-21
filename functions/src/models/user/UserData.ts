import { Timestamp } from 'firebase-admin/firestore';
import { User } from './User';

export interface UserData
  extends Omit<User, 'id' | 'dateOfBirth' | 'createdAt' | 'registeredAt' | 'updatedAt' | 'lastLoggedInAt'> {
  dateOfBirth?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  registeredAt?: Timestamp;
  lastLoggedInAt: Timestamp;
}
