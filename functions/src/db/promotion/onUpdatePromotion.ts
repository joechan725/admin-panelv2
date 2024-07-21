import * as functions from 'firebase-functions';
import { updatePromotionList } from './helpers/updatePromotionList';
import { PromotionData } from '../../models/promotion/PromotionData';

export const onUpdatePromotion = functions.firestore
  .document('promotions/{promotionId}')
  .onUpdate(async (change, context) => {
    const { promotionId } = context.params;

    const promotionSnapBefore = change.before;
    const promotionSnapAfter = change.after;

    const promotionDataBefore = promotionSnapBefore.data() as PromotionData;
    const promotionDataAfter = promotionSnapAfter.data() as PromotionData;

    await updatePromotionList({ promotionId, promotionDataAfter, promotionDataBefore, mode: 'update' });
  });
