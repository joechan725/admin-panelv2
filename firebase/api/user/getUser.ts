import { db } from '@/firebase/config';
import { userConverter } from '@/firebase/converter/user/userConverter';
import { doc, getDoc } from 'firebase/firestore';

export const getUser = async (userId: string) => {
  // prepare the user ref.
  const userRef = doc(db, `users/${userId}`).withConverter(userConverter);

  // get the document
  const userSnap = await getDoc(userRef);

  // return the user
  const user = userSnap.data();
  return user;
};
