import { db } from '@/firebase/config';
import { userConverter } from '@/firebase/converter/user/userConverter';
import { collection, getDocs } from 'firebase/firestore';

export const getUsers = async () => {
  // prepare
  const usersRef = collection(db, 'users').withConverter(userConverter);

  // get
  const usersSnapshot = await getDocs(usersRef);

  return usersSnapshot.docs.map((doc) => doc.data());
};
