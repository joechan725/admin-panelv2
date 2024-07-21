import * as functions from 'firebase-functions';
import { updateSmartBarList } from './helpers/updateSmartBarList';
import { SmartBarData } from '../../models/smartBar/SmartBarData';

export const onCreateSmartBar = functions.firestore
  .document('smartBars/{smartBarId}')
  .onCreate(async (snapshot, context) => {
    const { smartBarId } = context.params;

    const smartBarData = snapshot.data() as SmartBarData;

    await updateSmartBarList({ smartBarId, smartBarDataAfter: smartBarData, mode: 'create' });
  });
