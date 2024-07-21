import { User } from '@/models/user/User';
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface UserData extends Omit<User, 'createdAt' | 'updatedAt' | 'registeredAt' | 'lastLoggedInAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  registeredAt?: Timestamp;
  lastLoggedInAt: Timestamp;
}

interface UserListData {
  users: (UserData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const privateUserListConverter = {
  toFirestore: (users: User[]) => {
    return users;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User[] => {
    const userListData = snapshot.data(options) as UserListData;

    const usersData = userListData.users;

    const users: User[] = usersData.map(
      (userData): User => ({
        ...userData,
        createdAt: userData.createdAt.toMillis(),
        updatedAt: userData.updatedAt.toMillis(),
        registeredAt: userData.registeredAt?.toMillis(),
        lastLoggedInAt: userData.lastLoggedInAt.toMillis(),
      })
    );

    return users;
  },
};
