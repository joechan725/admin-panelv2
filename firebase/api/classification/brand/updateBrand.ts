import { db } from '@/firebase/config';
import { Brand } from '@/models/classification/brand/Brand';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';
import { doc, FieldValue, updateDoc } from 'firebase/firestore';

export interface UpdateBrandData extends ExtendWithFieldValue<Partial<Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>>> {
  updatedAt: FieldValue;
}

interface UpdateBrandParameters {
  brandData: UpdateBrandData;
  brandId: string;
}

export const updateBrand = async ({ brandData, brandId }: UpdateBrandParameters) => {
  // prepare
  const brandRef = doc(db, `brands/${brandId}`);

  const updatedBrand = {
    ...brandData,
  };

  // update
  await updateDoc(brandRef, updatedBrand);
};
