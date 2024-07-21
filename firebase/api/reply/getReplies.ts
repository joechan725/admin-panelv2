import { db } from '@/firebase/config';
import { replyConverter } from '@/firebase/converter/reply/replyConverter';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export const getReplies = async () => {
  const repliesRef = collection(db, '/replies').withConverter(replyConverter);

  const repliesQuery = query(repliesRef, orderBy('updatedAt', 'desc'));

  const repliesSnap = await getDocs(repliesQuery);

  const replies = repliesSnap.docs.map((doc) => doc.data());

  return replies;
};
