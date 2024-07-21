import * as functions from 'firebase-functions';
import { updateVisitStatistic } from './helpers/updateVisitStatistic';
import { updateUserList } from './helpers/updateUserList';
import { UserData } from '../../models/user/UserData';

export const onCreateUser = functions.firestore.document('users/{userId}').onCreate(async (snapshot, context) => {
  const userData = snapshot.data() as UserData;
  const { userId } = context.params;

  await updateUserList({ userId, userDataAfter: userData, mode: 'create' });

  await updateVisitStatistic({ modes: ['addAnonymousUser'], date: new Date() });
});
