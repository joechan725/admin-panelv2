import * as functions from 'firebase-functions';
import { updatePromotionList } from './helpers/updatePromotionList';
import { PromotionData } from '../../models/promotion/PromotionData';

export const onCreatePromotion = functions.firestore
  .document('promotions/{promotionId}')
  .onCreate(async (snapshot, context) => {
    const { promotionId } = context.params;

    const promotionData = snapshot.data() as PromotionData;

    await updatePromotionList({ promotionId, promotionDataAfter: promotionData, mode: 'create' });
  });
