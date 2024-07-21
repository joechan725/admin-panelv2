import { db } from '@/firebase/config';
import { replyConverter } from '@/firebase/converter/reply/replyConverter';
import { doc, getDoc } from 'firebase/firestore';

export const getReply = async (replyId: string) => {
  const replyRef = doc(db, `/replies/${replyId}`).withConverter(replyConverter);

  const replySnap = await getDoc(replyRef);

  const replyData = replySnap.data();

  return replyData;
};
