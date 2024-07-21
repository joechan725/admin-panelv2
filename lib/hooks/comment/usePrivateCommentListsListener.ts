import { Comment } from '@/models/comment/Comment';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { commentListConverter } from '@/firebase/converter/comment/commentListConverter';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';

export const usePrivateCommentListsListener = () => {
  const [privateComments, setPrivateComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const privateCommentListsRef = collection(db, 'privateCommentLists').withConverter(commentListConverter);
    const privateCommentListsQuery = query(privateCommentListsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      privateCommentListsQuery,
      (snapshot) => {
        const privateCommentsListsData = snapshot.docs.map((doc) => doc.data());
        const privateCommentsData = privateCommentsListsData.flat();

        const sortedCommentsData = sortObjectsByKey(privateCommentsData, 'updatedAt', 'desc');

        setPrivateComments(sortedCommentsData);
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
  }, []);

  return {
    privateComments,
    isLoading,
    error,
  };
};
