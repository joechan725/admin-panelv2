import { db } from '@/firebase/config';
import { smartBarListConverter } from '@/firebase/converter/smartBar/smartBarListConverter';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { collection, getDocs } from 'firebase/firestore';

interface GetSmartBarListsProps {}

export const getSmartBarLists = async () => {
  const smartBarListsRef = collection(db, 'smartBarLists').withConverter(smartBarListConverter);

  const smartBarListsSnap = await getDocs(smartBarListsRef);

  const smartBarLists = smartBarListsSnap.docs.map((doc) => doc.data());

  const smartBars = smartBarLists.flat();

  return sortObjectsByKey(smartBars, 'updatedAt', 'desc');
};
