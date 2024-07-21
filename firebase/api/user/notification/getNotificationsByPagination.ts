import { db } from '@/firebase/config';
import { notificationConverter } from '@/firebase/converter/user/notification/notificationConverter';
import { collection, orderBy, query, startAfter, limit, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';

interface GetNotificationsByPaginationParameter {
  userId: string;
  limitNum: number;
  lastSnap?: QueryDocumentSnapshot;
}

export const getNotificationsByPagination = async ({
  userId,
  limitNum,
  lastSnap,
}: GetNotificationsByPaginationParameter) => {
  // prepare
  const notificationsRef = collection(db, `users/${userId}/notifications`).withConverter(notificationConverter);
  let notificationsQuery = query(notificationsRef, orderBy('updatedAt', 'desc'));

  // start after previous fetched.
  if (lastSnap) {
    notificationsQuery = query(notificationsQuery, startAfter(lastSnap));
  }

  // limit the number fetch.
  if (limitNum) {
    notificationsQuery = query(notificationsQuery, limit(limitNum));
  }

  // get
  const notificationsSnap = await getDocs(notificationsQuery);
  const notifications = notificationsSnap.docs.map((doc) => ({ ...doc.data() }));

  // lastSnap for next time fetching
  const nextLastSnap = notificationsSnap.docs.at(-1);
  // return the data
  return { notifications, nextLastSnap };
};
