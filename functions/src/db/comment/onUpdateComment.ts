import * as functions from 'firebase-functions';
import { updateProductRating } from './helpers/updateProductRating';
import { updateCommentList } from './helpers/updateCommentList';
import { updateCommentStatistic } from './helpers/updateCommentStatistic';
import { CommentData } from '../../models/comment/CommentData';
import { addDeletedComment } from './helpers/addDeletedComment';
import { updateCommentedOrderItem } from './helpers/updateCommentedOrderItem';
import { validateComment } from './helpers/validateComment';

export const onUpdateComment = functions.firestore
  .document('comments/{commentId}')
  .onUpdate(async (change, context) => {
    const { commentId } = context.params;

    const commentSnapAfter = change.after;
    const commentSnapBefore = change.before;

    const commentRef = commentSnapAfter.ref;

    const commentDataAfter = commentSnapAfter.data() as CommentData;
    const commentDataBefore = commentSnapBefore.data() as CommentData;

    const { isValid } = await validateComment({ commentData: commentDataAfter, commentRef });
    if (!isValid) {
      return;
    }

    const { productId, userId, orderId } = commentDataAfter;

    if (commentDataBefore.published === false && commentDataAfter.published === true) {
      // The comment is created
      // update commented order item
      await updateCommentedOrderItem({ orderId, productId });

      // update product rating
      await updateProductRating({ mode: 'create', productId, ratingAfter: commentDataAfter.rating });

      // update comment statistic
      await updateCommentStatistic({ mode: 'increment' });

      // update the comment list
      await updateCommentList({ productId, commentId, userId, commentDataAfter, mode: 'create' });
      return;
    }

    if (commentDataBefore.published === true && commentDataAfter.deletedAt === undefined) {
      // The comment is updated
      // update product rating
      if (commentDataBefore.rating !== commentDataAfter.rating) {
        await updateProductRating({
          mode: 'update',
          productId,
          ratingAfter: commentDataAfter.rating,
          ratingBefore: commentDataBefore.rating,
        });
      }

      // update the comment list
      await updateCommentList({ productId, commentId, userId, commentDataBefore, commentDataAfter, mode: 'update' });
    }

    if (commentDataAfter.deletedAt !== undefined) {
      // The comment is deleted
      // update product rating
      await updateProductRating({ mode: 'delete', productId, ratingBefore: commentDataBefore.rating });

      // update comment statistic
      await updateCommentStatistic({
        mode: 'decrement',
        date: commentDataAfter.createdAt,
      });

      // update the comment list
      await updateCommentList({ productId, commentId, userId, commentDataBefore, mode: 'delete' });

      // update the deleted comments
      await addDeletedComment({ commentId, commentData: commentDataAfter });
    }
  });
