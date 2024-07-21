import * as functions from 'firebase-functions';
import { updateSmartBarList } from './helpers/updateSmartBarList';
import { SmartBarData } from '../../models/smartBar/SmartBarData';
import { addDeletedSmartBar } from './helpers/addDeletedSmartBar';

export const onUpdateSmartBar = functions.firestore
  .document('smartBars/{smartBarId}')
  .onUpdate(async (change, context) => {
    const { smartBarId } = context.params;

    const smartBarSnapBefore = change.before;
    const smartBarSnapAfter = change.after;

    const smartBarDataBefore = smartBarSnapBefore.data() as SmartBarData;
    const smartBarDataAfter = smartBarSnapAfter.data() as SmartBarData;

    if (smartBarDataAfter.deletedAt === undefined) {
      // The smart bar is updated
      // Update the smart bar list
      await updateSmartBarList({ smartBarId, smartBarDataBefore, smartBarDataAfter, mode: 'update' });
    }

    if (smartBarDataAfter.deletedAt !== undefined) {
      // The smart bar is deleted
      // Update the smart bar list
      await updateSmartBarList({ smartBarId, smartBarDataBefore, mode: 'delete' });
      // Copy the smart bar to deleted smart bar
      await addDeletedSmartBar({ smartBarId, smartBarData: smartBarDataAfter });
    }
  });
