import { db } from '@/firebase/config';
import { classificationConverter } from '@/firebase/converter/classification/classificationConverter';
import { Brand } from '@/models/classification/brand/Brand';
import { collection, getDocs } from 'firebase/firestore';

export const getBrands = async (): Promise<Brand[]> => {
  // prepare
  const brandsRef = collection(db, 'brands').withConverter(classificationConverter);

  // get
  const brandsSnap = await getDocs(brandsRef);

  // convert to list
  const brandsData = brandsSnap.docs.map((doc) => ({ ...doc.data() }));

  return brandsData;
};
