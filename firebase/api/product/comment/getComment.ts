import { db } from '@/firebase/config';
import { commentConverter } from '@/firebase/converter/comment/commentConverter';
import { doc, getDoc } from 'firebase/firestore';

export const getComment = async (commentId: string) => {
  const commentRef = doc(db, `/comments/${commentId}`).withConverter(commentConverter);

  const commentSnap = await getDoc(commentRef);

  const commentData = commentSnap.data();

  return commentData;
};
