import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export const deleteSmartBar = async (smartBarId: string) => {
  const smartBarRef = doc(db, `smartBars/${smartBarId}`);

  await deleteDoc(smartBarRef);
};
