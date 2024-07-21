import { Comment } from '@/models/comment/Comment';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { commentListConverter } from '@/firebase/converter/comment/commentListConverter';

export const useAdminCommentListsListener = (userId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const userCommentListsRef = collection(db, `users/${userId}/commentLists`).withConverter(commentListConverter);
    const unsubscribe = onSnapshot(
      userCommentListsRef,
      (snapshot) => {
        const commentListsData = snapshot.docs.map((doc) => doc.data());
        const commentsData = commentListsData.flat();
        setComments(commentsData);
        setIsLoading(false);
      },
      (error) => {
        setError('unexpectedError');
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return { comments, isLoading, error };
};
