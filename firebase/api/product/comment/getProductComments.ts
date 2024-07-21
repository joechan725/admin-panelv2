import { db } from '@/firebase/config';
import { commentConverter } from '@/firebase/converter/comment/commentConverter';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export const getProductComments = async (productId: string) => {
  const commentsRef = collection(db, `/products/${productId}/comments`).withConverter(commentConverter);

  const commentsQuery = query(commentsRef, orderBy('updatedAt', 'desc'));

  const commentsSnap = await getDocs(commentsQuery);

  const comments = commentsSnap.docs.map((doc) => doc.data());

  return comments;
};
