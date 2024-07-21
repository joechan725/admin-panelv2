import { db } from '@/firebase/config';
import { privateUserListConverter } from '@/firebase/converter/user/privateUserListConverter';
import { User } from '@/models/user/User';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const usePrivateUserListsListener = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<undefined | string>(undefined);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const userListRef = collection(db, 'privateUserLists').withConverter(privateUserListConverter);

    const unsubscribe = onSnapshot(
      userListRef,
      (snapshot) => {
        const usersListsData = snapshot.docs.map((doc) => doc.data());
        const usersData = usersListsData.flat();

        setUsers(usersData);
        setIsLoading(false);
      },
      (error) => {
        setError('unexpectedError');
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return { users, isLoading, error };
};
