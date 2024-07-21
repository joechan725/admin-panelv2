import { fakerZH_TW as faker } from '@faker-js/faker';
import { StoreAddress } from '@/models/store/StoreAddress';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { generateFakeImage } from '../image/generateFakeImage';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { regions } from '@/types/Region';
import { districts } from '@/types/District';

interface StoreAddressData extends Omit<StoreAddress, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt?: FieldValue;
}

export const generateFakeStoreAddress = (): StoreAddressData => {
  const name = faker.company.name();
  return removeEmptyFieldFormObject({
    name,
    region: regions[faker.number.int({ min: 0, max: regions.length - 1 })],
    district: districts[faker.number.int({ min: 0, max: regions.length - 1 })],
    detailAddress: faker.location.streetAddress(),
    phoneNumber: faker.phone.number(),
    businessHours: `${faker.number.int({ min: 7, max: 10 })} AM - ${faker.number.int({
      min: 5,
      max: 11,
    })} PM`,
    images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => generateFakeImage(name)),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
