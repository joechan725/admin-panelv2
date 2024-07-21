import { db } from '@/firebase/config';
import { commentListConverter } from '@/firebase/converter/comment/commentListConverter';
import { collection, getDocs } from 'firebase/firestore';

export const getProductCommentLists = async (productId: string) => {
  // prepare
  const commentListsRef = collection(db, `/products/${productId}/commentLists`).withConverter(commentListConverter);
  // get
  const commentListsSnap = await getDocs(commentListsRef);
  // convert lists to comments
  const commentLists = commentListsSnap.docs.map((doc) => doc.data());
  const comments = commentLists.flat();
  // return
  return comments;
};
