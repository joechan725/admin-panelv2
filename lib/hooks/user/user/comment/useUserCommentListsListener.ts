import { Comment } from '@/models/comment/Comment';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { commentListConverter } from '@/firebase/converter/comment/commentListConverter';
import { useSessionStore } from '@/stores/useSessionStore';

export const useUserCommentListsListener = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const { user } = useSessionStore((state) => ({ user: state.user }));

  useEffect(() => {
    if (!user) {
      return;
    }

    const userId = user.id;
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
  }, [user]);

  return { comments, isLoading, error };
};
