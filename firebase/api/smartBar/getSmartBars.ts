import { db } from '@/firebase/config';
import { smartBarConverter } from '@/firebase/converter/smartBar/smartBarConverter';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

interface GetSmartBarsProps {
  publicOnly: boolean;
}

export const getSmartBars = async ({ publicOnly }: GetSmartBarsProps) => {
  const smartBarsRef = collection(db, 'smartBars').withConverter(smartBarConverter);
  let smartBarsQuery = query(smartBarsRef, orderBy('updatedAt', 'desc'));

  if (publicOnly) {
    smartBarsQuery = query(smartBarsQuery, where('isPublic', '==', true));
  }

  const smartBarsSnap = await getDocs(smartBarsQuery);

  const smartBars = smartBarsSnap.docs.map((doc) => ({ ...doc.data() }));
  return smartBars;
};
