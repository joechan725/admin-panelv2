import { db } from '@/firebase/config';
import { tagConverter } from '@/firebase/converter/tag/tagConverter';
import { Tag } from '@/models/tag/Tag';
import { collection, getDocs } from 'firebase/firestore';

export const getTags = async (): Promise<Tag[]> => {
  const tagsRef = collection(db, 'tags').withConverter(tagConverter);

  const tagsSnap = await getDocs(tagsRef);

  const tagsData = tagsSnap.docs.map((doc) => ({ ...doc.data() }));

  return tagsData;
};
