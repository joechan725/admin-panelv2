import { db } from '@/firebase/config';
import { classificationConverter } from '@/firebase/converter/classification/classificationConverter';
import { Brand } from '@/models/classification/brand/Brand';
import { doc, getDoc } from 'firebase/firestore';

export const getBrand = async (brandId: string): Promise<Brand | undefined> => {
  // prepare
  const brandRef = doc(db, `brands/${brandId}`).withConverter(classificationConverter);

  // get
  const brandSnap = await getDoc(brandRef);

  // convert to data
  const brandData = brandSnap.data();

  return brandData;
};
