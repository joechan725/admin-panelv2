import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { CommentData } from '../../../models/comment/CommentData';
import { logger } from 'firebase-functions/v1';

interface AddDeletedCommentParameters {
  commentId: string;
  commentData: CommentData;
}

/**
 * Delete the comment and move the data to deletedComments collections
 *
 * @param commentId: The id of comment
 * @param commentData: The original data of the comment
 */

export const addDeletedComment = async ({ commentData, commentId }: AddDeletedCommentParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    // Delete the original comment
    const commentRef = db.collection('comments').doc(commentId);
    bigBatch.delete(commentRef);

    // Move the data to deleted comments collection
    const deletedCommentsRef = db.collection('deletedComments').doc(commentId);
    bigBatch.set(deletedCommentsRef, commentData, { merge: true });

    // Commit the batch
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on moving deleted comment', error);
  }
};
