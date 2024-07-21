import * as functions from 'firebase-functions';
import { updateCommentReplies } from './helpers/updateCommentReplies';
import { ReplyData } from '../../models/reply/ReplyData';
import { addDeletedReply } from './helpers/addDeletedReply';

export const onUpdateReply = functions.firestore.document('/replies/{replyId}').onUpdate(async (change, context) => {
  const { replyId } = context.params;

  const replySnapBefore = change.before;
  const replySnapAfter = change.after;

  const replyDataBefore = replySnapBefore.data() as ReplyData;
  const replyDataAfter = replySnapAfter.data() as ReplyData;

  const { commentId } = replyDataAfter;

  if (replyDataAfter.deletedAt === undefined) {
    // The reply is updated
    // update the reply at comment
    await updateCommentReplies({
      commentId,
      replyId,
      replyDataAfter,
      replyDataBefore,
      mode: 'update',
    });
  }

  if (replyDataAfter.deletedAt !== undefined) {
    // The reply is deleted
    // update the reply at comment
    await updateCommentReplies({
      commentId,
      replyId,
      replyDataBefore,
      mode: 'delete',
    });

    // update the deleted comments
    await addDeletedReply({ replyData: replyDataAfter, replyId });
  }
});
