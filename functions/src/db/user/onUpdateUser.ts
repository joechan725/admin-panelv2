import * as functions from 'firebase-functions';
import { updateVisitStatistic, UpdateVisitStatisticMode } from './helpers/updateVisitStatistic';
import { getDateString } from '../../lib/helpers/date/getDateString';
import { updateUserList } from './helpers/updateUserList';
import { UserData } from '../../models/user/UserData';

export const onUpdateUser = functions.firestore.document('users/{userId}').onUpdate(async (change, context) => {
  const userDataBefore = change.before.data() as UserData;
  const userDataAfter = change.after.data() as UserData;

  const { userId } = context.params;

  await updateUserList({ userId, userDataAfter, userDataBefore, mode: 'update' });

  const modes: UpdateVisitStatisticMode[] = [];

  if (userDataBefore.isAnonymous === true && userDataAfter.isAnonymous === false) {
    modes.push('register');
  }

  const lastLoggedInAtDateStringBefore = getDateString(userDataBefore.lastLoggedInAt);
  const lastLoggedInAtDateStringAfter = getDateString(userDataAfter.lastLoggedInAt);

  if (userDataAfter.isAnonymous === true) {
    if (lastLoggedInAtDateStringBefore.futureDayStrings[0] !== lastLoggedInAtDateStringAfter.futureDayStrings[0]) {
      modes.push('increment-daily-visitorCount-anonymousUser');
    }
    if (lastLoggedInAtDateStringBefore.futureMonthStrings[0] !== lastLoggedInAtDateStringAfter.futureMonthStrings[0]) {
      modes.push('increment-monthly-visitorCount-anonymousUser');
    }
    if (lastLoggedInAtDateStringBefore.futureYearStrings[0] !== lastLoggedInAtDateStringAfter.futureYearStrings[0]) {
      modes.push('increment-yearly-visitorCount-anonymousUser');
    }
  }

  if (userDataAfter.isAnonymous === false) {
    if (lastLoggedInAtDateStringBefore.futureDayStrings[0] !== lastLoggedInAtDateStringAfter.futureDayStrings[0]) {
      modes.push('increment-daily-visitorCount-registeredUser');
    }
    if (lastLoggedInAtDateStringBefore.futureMonthStrings[0] !== lastLoggedInAtDateStringAfter.futureMonthStrings[0]) {
      modes.push('increment-monthly-visitorCount-registeredUser');
    }
    if (lastLoggedInAtDateStringBefore.futureYearStrings[0] !== lastLoggedInAtDateStringAfter.futureYearStrings[0]) {
      modes.push('increment-yearly-visitorCount-registeredUser');
    }
  }

  if (modes.length > 0) {
    await updateVisitStatistic({ modes, date: new Date() });
  }
});
