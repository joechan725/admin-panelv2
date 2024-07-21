import { User } from '@/models/user/User';
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface UserData
  extends Omit<User, 'createdAt' | 'updatedAt' | 'registeredAt' | 'lastLoggedInAt' | 'dateOfBirth' | 'id'> {
  dateOfBirth: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  registeredAt?: Timestamp;
  lastLoggedInAt: Timestamp;
}

export const userConverter = {
  toFirestore: (user: User) => {
    return user;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User => {
    const userData = snapshot.data(options) as UserData;

    return {
      ...userData,
      id: snapshot.id,
      dateOfBirth: userData.dateOfBirth?.toMillis(),
      createdAt: userData.createdAt?.toMillis(),
      registeredAt: userData.registeredAt?.toMillis(),
      updatedAt: userData.updatedAt?.toMillis(),
      lastLoggedInAt: userData.lastLoggedInAt?.toMillis(),
    };
  },
};
