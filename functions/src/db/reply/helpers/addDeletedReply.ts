import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { ReplyData } from '../../../models/reply/ReplyData';
import { logger } from 'firebase-functions/v1';

interface AddDeletedReplyParameters {
  replyId: string;
  replyData: ReplyData;
}

/**
 * Delete the reply and move the data to deletedReplies collections
 *
 * @param replyId: The id of reply
 * @param replyData: The original data of the reply
 */

export const addDeletedReply = async ({ replyData, replyId }: AddDeletedReplyParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    // Delete the original reply
    const replyRef = db.collection('replies').doc(replyId);
    bigBatch.delete(replyRef);

    // Move the data to deleted replies collection
    const deletedRepliesRef = db.collection('deletedReplies').doc(replyId);
    bigBatch.set(deletedRepliesRef, replyData, { merge: true });

    // Commit the batch
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on moving deleted reply', error);
  }
};
