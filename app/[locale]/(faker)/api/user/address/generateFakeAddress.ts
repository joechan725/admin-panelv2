import { fakerZH_TW as faker } from '@faker-js/faker';
import { Address } from '@/models/Address';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { regions } from '@/types/Region';
import { districts } from '@/types/District';

interface AddressData extends Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt?: FieldValue;
}

export const generateFakeAddress = (): AddressData =>
  removeEmptyFieldFormObject({
    remark: faker.word.noun(),
    region: regions[faker.number.int({ min: 0, max: regions.length - 1 })],
    district: districts[faker.number.int({ min: 0, max: regions.length - 1 })],
    detailAddress: faker.location.streetAddress(),
    contactPhoneNumber: faker.phone.number(),
    contactName: faker.person.fullName(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
