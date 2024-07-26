import * as functions from 'firebase-functions';
import { updateCommentList } from './helpers/updateCommentList';
import { CommentData } from '../../models/comment/CommentData';
import { addDeletedComment } from './helpers/addDeletedComment';
import { Timestamp } from 'firebase-admin/firestore';

export const onDeleteComment = functions.firestore.document('comments/{commentId}').onDelete(async (snap, context) => {
  const { commentId } = context.params;

  const commentData = { ...snap.data(), deletedAt: Timestamp.now() } as CommentData;

  const { productId, userId } = commentData;

  // update the comment list
  await updateCommentList({ productId, commentId, userId, commentDataBefore: commentData, mode: 'delete' });

  // update the deleted comments
  await addDeletedComment({ commentId, commentData: commentData });
});
