import { db } from '@/firebase/config';
import { smartBarConverter } from '@/firebase/converter/smartBar/smartBarConverter';
import { doc, getDoc } from 'firebase/firestore';

interface GetSmartBarsProps {
  smartBarId: string;
}

export const getSmartBar = async ({ smartBarId }: GetSmartBarsProps) => {
  const smartBarRef = doc(db, `smartBars/${smartBarId}`).withConverter(smartBarConverter);

  const smartBarSnap = await getDoc(smartBarRef);

  const smartBar = smartBarSnap.data();
  return smartBar;
};
