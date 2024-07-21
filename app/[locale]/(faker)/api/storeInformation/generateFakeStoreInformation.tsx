import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { StoreInformation } from '@/models/store/StoreInformation';
import { fakerZH_TW as faker } from '@faker-js/faker';
import { FieldValue, serverTimestamp } from 'firebase/firestore';

interface StoreInformationData extends Omit<StoreInformation, 'id' | 'updatedAt'> {
  updatedAt: FieldValue;
}

export const generateFakeStoreInformation = (): StoreInformationData =>
  removeEmptyFieldFormObject({
    facebookURL: faker.datatype.boolean() ? faker.internet.url() : undefined,
    instagramURL: faker.datatype.boolean() ? faker.internet.url() : undefined,
    youtubeURL: faker.datatype.boolean() ? faker.internet.url() : undefined,
    twitterURL: faker.datatype.boolean() ? faker.internet.url() : undefined,
    whatsappNumber: faker.datatype.boolean() ? faker.phone.number() : undefined,
    phone: faker.phone.number(),
    email: faker.internet.email(),
    updatedAt: serverTimestamp(),
  });
