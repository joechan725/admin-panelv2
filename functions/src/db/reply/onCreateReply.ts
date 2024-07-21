import * as functions from 'firebase-functions';
import { updateCommentReplies } from './helpers/updateCommentReplies';
import { ReplyData } from '../../models/reply/ReplyData';

export const onCreateReply = functions.firestore.document('/replies/{replyId}').onCreate(async (snapshot, context) => {
  const { replyId } = context.params;
  const replyData = snapshot.data() as ReplyData;
  const { commentId } = replyData;

  await updateCommentReplies({ commentId, replyId, replyDataAfter: replyData, mode: 'create' });
});
