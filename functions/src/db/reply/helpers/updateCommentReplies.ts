import { FieldValue } from 'firebase-admin/firestore';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { ReplyData } from '../../../models/reply/ReplyData';
import { CommentData } from '../../../models/comment/CommentData';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

type UpdateCommentRepliesParameters = CreateModeParameters | UpdateModeParameters | DeleteModeParameters;

interface CreateModeParameters {
  commentId: string;
  replyId: string;
  replyDataBefore?: undefined;
  replyDataAfter: ReplyData;
  mode: 'create';
}

interface UpdateModeParameters {
  commentId: string;
  replyId: string;
  replyDataBefore: ReplyData;
  replyDataAfter: ReplyData;
  mode: 'update';
}

interface DeleteModeParameters {
  commentId: string;
  replyId: string;
  replyDataBefore: ReplyData;
  replyDataAfter?: undefined;
  mode: 'delete';
}

/**
 * Update the replies of comment (denormalization) when the reply is written.
 *
 * @param commentId - The id of the comment
 * @param replyId - The id of the comment
 * @param commentDataBefore - The public product firebase data before
 * @param commentDataAfter - The public product firebase data after
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateCommentReplies = async ({
  commentId,
  replyId,
  replyDataAfter,
  replyDataBefore,
  mode,
}: UpdateCommentRepliesParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    const commentRef = db.collection('comments').doc(commentId);

    if (mode === 'create') {
      const replyDataAfterWithId = {
        ...replyDataAfter,
        id: replyId,
      };

      // Add reply to the comment's replies
      const unionReply: Partial<ExtendWithFieldValue<CommentData>> = {
        replies: FieldValue.arrayUnion(replyDataAfterWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      bigBatch.set(commentRef, unionReply, { merge: true });
    }

    if (mode === 'update') {
      const replyDataBeforeWithId = {
        ...replyDataBefore,
        id: replyId,
      };
      const replyDataAfterWithId = {
        ...replyDataAfter,
        id: replyId,
      };
      // Update the reply at comment's replies
      // Remove the existing reply
      const removeReply: Partial<ExtendWithFieldValue<CommentData>> = {
        replies: FieldValue.arrayRemove(replyDataBeforeWithId),
      };
      bigBatch.set(commentRef, removeReply, { merge: true });
      // Union the new reply
      const unionReply: Partial<ExtendWithFieldValue<CommentData>> = {
        replies: FieldValue.arrayUnion(replyDataAfterWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };
      bigBatch.set(commentRef, unionReply, { merge: true });
    }

    if (mode === 'delete') {
      const replyDataBeforeWithId = {
        ...replyDataBefore,
        id: replyId,
      };
      // Remove the reply from comment's replies
      const removeReply: Partial<ExtendWithFieldValue<CommentData>> = {
        replies: FieldValue.arrayRemove(replyDataBeforeWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };
      bigBatch.set(commentRef, removeReply, { merge: true });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error("Error on updating comment's reply", error);
  }
};
