import { db } from '@/firebase/config';
import { privateUserListConverter } from '@/firebase/converter/user/privateUserListConverter';
import { collection, getDocs } from 'firebase/firestore';

export const getUserLists = async () => {
  // prepare
  const userListsRef = collection(db, 'privateUserLists').withConverter(privateUserListConverter);

  // get
  const userListsSnap = await getDocs(userListsRef);

  const userLists = userListsSnap.docs.map((doc) => doc.data());

  const users = userLists.flat();

  return users;
};
