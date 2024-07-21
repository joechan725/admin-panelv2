import { FieldValue } from 'firebase-admin/firestore';
import { maxCommentsPreList } from '../../maxItemsPreList';
import { CommentData } from '../../../models/comment/CommentData';
import { CommentListData } from '../../../models/comment/CommentListData';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';

type UpdateCommentListParameters = CreateMode | UpdateMode | DeleteMode;

interface CreateMode {
  productId: string;
  commentId: string;
  userId: string;
  commentDataBefore?: undefined;
  commentDataAfter: CommentData;
  mode: 'create';
}

interface UpdateMode {
  productId: string;
  commentId: string;
  userId: string;
  commentDataBefore: CommentData;
  commentDataAfter: CommentData;
  mode: 'update';
}

interface DeleteMode {
  productId: string;
  commentId: string;
  userId: string;
  commentDataBefore: CommentData;
  commentDataAfter?: undefined;
  mode: 'delete';
}

/**
 * Update the commentList of product (denormalization) when the comment is written.
 *
 * @param productId - The id of the product
 * @param commentId - The id of the comment
 * @param commentData - The public product firebase data
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateCommentList = async ({
  productId,
  commentId,
  userId,
  commentDataAfter,
  commentDataBefore,
  mode,
}: UpdateCommentListParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    const productCommentListsRef = db.collection('products').doc(productId).collection('commentLists');
    const privateCommentListsRef = db.collection('privateCommentLists');
    const userCommentListsRef = db.collection('users').doc(userId).collection('commentLists');

    if (mode === 'create') {
      // The list data to be joined
      const commentDataAfterWithId = {
        ...commentDataAfter,
        id: commentId,
      };
      const commentListDataUnion: ExtendWithFieldValue<Partial<CommentListData>> = {
        ids: FieldValue.arrayUnion(commentId),
        comments: FieldValue.arrayUnion(commentDataAfterWithId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Add comment to a product comment list
      // Find the latest created list which contains comments < maxCommentsPerList
      const productCommentListsQuery = productCommentListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxCommentsPreList)
        .limit(1);
      const productCommentListsSnap = await productCommentListsQuery.get();
      const productCommentListSnap = productCommentListsSnap.docs.at(0);
      if (productCommentListSnap?.exists) {
        // The latest created list exist
        const productCommentListRef = productCommentListSnap.ref;
        bigBatch.set(productCommentListRef, commentListDataUnion, { merge: true });
      } else {
        // The latest list does not exist
        // Create a new list
        const productCommentListRef = productCommentListsRef.doc();
        commentListDataUnion.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(productCommentListRef, commentListDataUnion, { merge: true });
      }

      // Add comment to private list
      // Find the latest created list which contains comments < maxCommentsPerList
      const privateCommentListsQuery = privateCommentListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxCommentsPreList)
        .limit(1);
      const privateCommentListsSnap = await privateCommentListsQuery.get();
      const privateCommentListSnap = privateCommentListsSnap.docs.at(0);

      if (privateCommentListSnap?.exists) {
        // The latest created list exist
        // Join the product to that list
        const privateCommentListRef = privateCommentListSnap.ref;
        bigBatch.set(privateCommentListRef, commentListDataUnion, { merge: true });
      } else {
        // The latest list does not exist
        // Create a new list
        const privateCommentListRef = privateCommentListsRef.doc();
        commentListDataUnion.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(privateCommentListRef, commentListDataUnion, { merge: true });
      }

      // Add comment to user comment list
      // Find the latest created list
      const userCommentListsQuery = userCommentListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxCommentsPreList)
        .limit(1);
      const userCommentListsSnap = await userCommentListsQuery.get();
      const userCommentListSnap = userCommentListsSnap.docs.at(0);

      if (userCommentListSnap?.exists) {
        // The latest created list exist
        // Join the product to that list
        const userCommentListRef = userCommentListSnap.ref;
        bigBatch.set(userCommentListRef, commentListDataUnion, { merge: true });
      } else {
        // The latest list does not exist
        // Create a new list
        const userCommentListRef = userCommentListsRef.doc();
        commentListDataUnion.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(userCommentListRef, commentListDataUnion, { merge: true });
      }
    }

    if (mode === 'update') {
      // The list data to be removed
      const commentDataBeforeWithId = {
        ...commentDataBefore,
        id: commentId,
      };
      const commentListDataRemove: ExtendWithFieldValue<Partial<CommentListData>> = {
        comments: FieldValue.arrayRemove(commentDataBeforeWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // The list data to be joined
      const commentDataAfterWithId = {
        ...commentDataAfter,
        id: commentId,
      };
      const commentListDataUnion: ExtendWithFieldValue<Partial<CommentListData>> = {
        comments: FieldValue.arrayUnion(commentDataAfterWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Update the comment at product comment list
      const productCommentListsQuery = productCommentListsRef.where('ids', 'array-contains', commentId).limit(1);
      const productCommentListsSnap = await productCommentListsQuery.get();
      const productCommentListSnap = productCommentListsSnap.docs.at(0);

      if (productCommentListSnap?.exists) {
        // The comment exists at a list already
        // Update the comment at that list
        const productCommentListRef = productCommentListSnap.ref;
        bigBatch.set(productCommentListRef, commentListDataRemove, { merge: true });
        bigBatch.set(productCommentListRef, commentListDataUnion, { merge: true });
      } else {
        // No actions required if the comment does not exist at a list
        throw new Error(
          `Error on updating comment ${commentId} in the list. Comment ${commentId} dose not exist at any list`
        );
      }

      // Update the comment at private comment list
      const privateCommentListsQuery = privateCommentListsRef.where('ids', 'array-contains', commentId).limit(1);
      const privateCommentListsSnap = await privateCommentListsQuery.get();
      const privateCommentListSnap = privateCommentListsSnap.docs.at(0);

      if (privateCommentListSnap?.exists) {
        // The comment exists at a list already
        // Update the comment at that list
        const privateCommentListRef = privateCommentListSnap.ref;
        bigBatch.set(privateCommentListRef, commentListDataRemove, { merge: true });
        bigBatch.set(privateCommentListRef, commentListDataUnion, { merge: true });
      } else {
        // No actions required if the comment does not exist at a list
        throw new Error(
          `Error on updating comment ${commentId} in the list. Comment ${commentId} dose not exist at any list`
        );
      }

      // Update the comment at user comment list
      const userCommentListsQuery = userCommentListsRef.where('ids', 'array-contains', commentId).limit(1);
      const userCommentListsSnap = await userCommentListsQuery.get();
      const userCommentListSnap = userCommentListsSnap.docs.at(0);

      if (userCommentListSnap?.exists) {
        // The comment exists at a list already
        // Update the comment at that list
        const userCommentListRef = userCommentListSnap.ref;
        bigBatch.set(userCommentListRef, commentListDataRemove, { merge: true });
        bigBatch.set(userCommentListRef, commentListDataUnion, { merge: true });
      } else {
        // No actions required if the comment does not exist at a list
        throw new Error(
          `Error on updating comment ${commentId} in the list. Comment ${commentId} dose not exist at any list`
        );
      }
    }

    if (mode === 'delete') {
      // The list data to be removed
      const commentDataBeforeWithId = {
        ...commentDataBefore,
        id: commentId,
      };
      const commentListDataRemove: ExtendWithFieldValue<Partial<CommentListData>> = {
        comments: FieldValue.arrayRemove(commentDataBeforeWithId),
        ids: FieldValue.arrayRemove(commentId),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Remove the comment from product comment list
      const productCommentListsRefQuery = productCommentListsRef.where('ids', 'array-contains', commentId).limit(1);
      const productCommentListsSnap = await productCommentListsRefQuery.get();
      const productCommentListSnap = productCommentListsSnap.docs.at(0);

      if (productCommentListSnap?.exists) {
        // The comment exist at a list
        // Remove the comment from the list
        const productCommentListRef = productCommentListSnap.ref;
        bigBatch.set(productCommentListRef, commentListDataRemove, { merge: true });
      } else {
        // No actions required if the comment does not exist at a list
        throw new Error(
          `Error on deleting comment ${commentId} from the list. Comment ${commentId} dose not exist at any list`
        );
      }

      // Remove the comment from private comment list
      const privateCommentListsRefQuery = privateCommentListsRef.where('ids', 'array-contains', commentId).limit(1);
      const privateCommentListsSnap = await privateCommentListsRefQuery.get();
      const privateCommentListSnap = privateCommentListsSnap.docs.at(0);

      if (privateCommentListSnap?.exists) {
        // The comment exist at a list
        // Remove the comment from the list
        const privateCommentListRef = privateCommentListSnap.ref;
        bigBatch.set(privateCommentListRef, commentListDataRemove, { merge: true });
      } else {
        // No actions required if the comment does not exist at a list
        throw new Error(
          `Error on deleting comment ${commentId} from the list. Comment ${commentId} dose not exist at any list`
        );
      }

      // Remove the comment from user comment list
      const userCommentListsQuery = userCommentListsRef.where('ids', 'array-contains', commentId).limit(1);
      const userCommentListsSnap = await userCommentListsQuery.get();
      const userCommentListSnap = userCommentListsSnap.docs.at(0);

      if (userCommentListSnap?.exists) {
        // The comment exist at a list
        // Remove the comment from the list
        const userCommentListRef = userCommentListSnap.ref;
        bigBatch.set(userCommentListRef, commentListDataRemove, { merge: true });
      } else {
        // No actions required if the comment does not exist at a list
        throw new Error(
          `Error on deleting comment ${commentId} from the list. Comment ${commentId} dose not exist at any list`
        );
      }
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating comment list', error);
  }
};
