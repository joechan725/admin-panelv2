import { handleImagesUpload } from '@/firebase/api/image/handleImagesUpload';
import { getComment } from '@/firebase/api/product/comment/getComment';
import { getProductCommentLists } from '@/firebase/api/product/comment/getProductCommentLists';
import { updateComment, UpdateCommentFirestoreData } from '@/firebase/api/product/comment/updateComment';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Comment } from '@/models/comment/Comment';
import { ImageInput } from '@/models/ImageInput';
import { CommentSchema } from '@/schemas/commentSchema';
import { useSessionStore } from '@/stores/useSessionStore';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '../toast/useToast';
import { revalidateProductPage } from '@/actions/revalidate/revalidateProductPage';

interface CreateCommentParameters {
  formData: CommentSchema;
  images: ImageInput[];
  productId: string;
  commentId: string;
}

interface EditCommentParameters {
  commentId: string;
  formData: CommentSchema;
  images: ImageInput[];
  productId: string;
}

interface RemoveCommentParameters {
  commentId: string;
  productId: string;
}

interface RemoveCommentsParameters {
  ids: {
    commentId: string;
    productId: string;
  }[];
}

export const useComment = () => {
  const { user } = useSessionStore();

  const [comment, setComment] = useState<Comment | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);

  const { toastSuccess, toastError } = useToast();

  const loadComment = async (commentId: string) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const commentData = await getComment(commentId);
      setComment(commentData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const loadComments = async (productId: string) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const commentsData = await getProductCommentLists(productId);
      setComments(commentsData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const createComment = async ({ productId, commentId, formData, images }: CreateCommentParameters) => {
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
      const imagesData = await handleImagesUpload('/images/products/comments', images, 'Comment image');
      const commentData: UpdateCommentFirestoreData = removeEmptyFieldFormObject({
        ...formData,
        images: imagesData,
        published: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      await updateComment({ commentId, commentFirestoreData: commentData });
      revalidateProductPage({ productIds: [productId] });
      toastSuccess('created');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const editComment = async ({ productId, commentId, formData, images }: EditCommentParameters) => {
    if (images.length > 3) {
      toastError('maximum3ImagesAllowed');
      setError('maximum3ImagesAllowed');
      setIsWriting(false);
      return false;
    }

    setIsWriting(true);
    setError(undefined);

    try {
      const imagesData = await handleImagesUpload('/images/products/comments', images, 'Comment image');
      const updateCommentData: UpdateCommentFirestoreData = {
        ...formData,
        images: imagesData,
        updatedAt: serverTimestamp(),
      };
      await updateComment({ commentId, commentFirestoreData: updateCommentData });
      revalidateProductPage({ productIds: [productId] });
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

  const removeComment = async ({ commentId, productId }: RemoveCommentParameters) => {
    setIsWriting(true);
    setError(undefined);

    try {
      const updateCommentData: UpdateCommentFirestoreData = {
        updatedAt: serverTimestamp(),
        deletedAt: serverTimestamp(),
      };
      await updateComment({ commentId, commentFirestoreData: updateCommentData });
      revalidateProductPage({ productIds: [productId] });
      toastSuccess('deleted');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const removeComments = async ({ ids }: RemoveCommentsParameters) => {
    setIsWriting(true);
    setError(undefined);

    try {
      const productIds: string[] = [];
      for (let i = 0; i < ids.length; i++) {
        const idObject = ids[i];
        const { commentId, productId } = idObject;
        productIds.push(productId);
        const updateCommentData: UpdateCommentFirestoreData = {
          updatedAt: serverTimestamp(),
          deletedAt: serverTimestamp(),
        };
        await updateComment({ commentId, commentFirestoreData: updateCommentData });
      }
      revalidateProductPage({ productIds });
      toastSuccess('deleted');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  return {
    comment,
    comments,
    error,
    isLoading,
    isWriting,
    loadComment,
    loadComments,
    createComment,
    editComment,
    removeComment,
    removeComments,
  };
};
