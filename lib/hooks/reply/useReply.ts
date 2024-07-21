import { handleImagesUpload } from '@/firebase/api/image/handleImagesUpload';
import { addReply, AddReplyFirestoreData } from '@/firebase/api/reply/addReply';
import { getReplies } from '@/firebase/api/reply/getReplies';
import { getReply } from '@/firebase/api/reply/getReply';
import { updateReply, UpdateReplyFirestoreData } from '@/firebase/api/reply/updateReply';
import { Reply } from '@/models/reply/Reply';
import { ImageInput } from '@/models/ImageInput';
import { ReplySchema } from '@/schemas/replySchema';
import { useSessionStore } from '@/stores/useSessionStore';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '../toast/useToast';

interface CreateReplyParameters {
  productId: string;
  commentId: string;
  formData: ReplySchema;
  images: ImageInput[];
}

interface EditReplyParameters {
  replyId: string;
  formData: ReplySchema;
  images: ImageInput[];
}

export const useReply = () => {
  const { user } = useSessionStore();

  const [reply, setReply] = useState<Reply | undefined>(undefined);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);

  const { toastSuccess, toastError } = useToast();

  const loadReply = async (replyId: string) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const replyData = await getReply(replyId);
      setReply(replyData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const loadReplies = async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const repliesData = await getReplies();
      setReplies(repliesData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const createReply = async ({ productId, commentId, formData, images }: CreateReplyParameters) => {
    if (!user) {
      toastError('unexpectedError');
      setError('unexpectedError');
      setIsWriting(false);
      return false;
    }

    if (images.length > 3) {
      toastError('maximum3ImagesAllowed');
      setError('maximum3ImagesAllowed');
      setIsWriting(false);
      return false;
    }

    setIsWriting(true);
    setError(undefined);

    try {
      const imagesData = await handleImagesUpload('/images/products/comments/replies', images, 'Reply image');

      const replyData: AddReplyFirestoreData = {
        ...formData,
        productId,
        commentId,
        userId: user.id,
        userAvatar: user.avatar,
        userRole: user.role,
        userEmail: user.email,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        images: imagesData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await addReply({ replyData });
      toastSuccess('updated');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const editReply = async ({ replyId, formData, images }: EditReplyParameters) => {
    if (images.length > 3) {
      toastError('maximum3ImagesAllowed');
      setError('maximum3ImagesAllowed');
      setIsWriting(false);
      return false;
    }

    setIsWriting(true);
    setError(undefined);

    try {
      const imagesData = await handleImagesUpload('/images/products/comments/replies', images, 'Reply image');

      const updateReplyData: UpdateReplyFirestoreData = {
        ...formData,
        images: imagesData,
        updatedAt: serverTimestamp(),
      };
      await updateReply({ replyId, replyFirestoreData: updateReplyData });
      toastSuccess('updated');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const removeReply = async (replyId: string) => {
    setIsWriting(true);
    setError(undefined);

    try {
      const updateReplyData: UpdateReplyFirestoreData = {
        updatedAt: serverTimestamp(),
        deletedAt: serverTimestamp(),
      };
      await updateReply({ replyId, replyFirestoreData: updateReplyData });
      toastSuccess('deleted');
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
    } finally {
      setIsWriting(false);
    }
  };

  const removeReplies = async (replyIds: string[]) => {
    setIsWriting(true);
    setError(undefined);

    try {
      for (let i = 0; i < replyIds.length; i++) {
        const replyId = replyIds[i];
        const updateReplyData: UpdateReplyFirestoreData = {
          updatedAt: serverTimestamp(),
          deletedAt: serverTimestamp(),
        };
        await updateReply({ replyId, replyFirestoreData: updateReplyData });
      }
      toastSuccess('deleted');
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
    } finally {
      setIsWriting(false);
    }
  };

  return {
    reply,
    replies,
    error,
    isLoading,
    isWriting,
    loadReply,
    loadReplies,
    createReply,
    editReply,
    removeReply,
    removeReplies,
  };
};
