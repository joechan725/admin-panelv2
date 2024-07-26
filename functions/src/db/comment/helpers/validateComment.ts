import { logger } from 'firebase-functions/v1';
import { CommentData } from '../../../models/comment/CommentData';
import { commentSchema } from '../../../schema/commentSchema';
import { DocumentData, DocumentReference } from 'firebase-admin/firestore';

interface ValidityCommentParameters {
  commentRef: DocumentReference<DocumentData>;
  commentData: CommentData;
}

/**
 * Validity the comment and delete it if checking fails
 *
 * @param commentRef - The reference of comment
 * @param commentData - The firestore comment data
 *
 * @returns The promise of { isValid: boolean }
 */

export const validateComment = async ({ commentRef, commentData }: ValidityCommentParameters) => {
  try {
    // Check the comment type
    commentSchema.parse(commentData);
    return { isValid: true };
  } catch (error) {
    // The comment failed the checking
    try {
      // Delete comment from the database
      await commentRef.delete();
    } catch (error) {
      logger.error('Error on deleting invalid comment', error);
    }
    return { isValid: false };
  }
};
