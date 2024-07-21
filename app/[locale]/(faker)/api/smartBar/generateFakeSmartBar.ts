import { fakerZH_TW as faker } from '@faker-js/faker';
import { SmartBar } from '@/models/smartBar/SmartBar';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';

interface SmartBarData extends Omit<SmartBar, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt?: FieldValue;
}

export const generateFakeSmartBar = (): SmartBarData => {
  const title = faker.datatype.boolean() ? faker.lorem.sentence() : undefined;
  const message = faker.lorem.sentences(2);
  const linkDescription = faker.datatype.boolean() ? faker.lorem.sentence() : undefined;

  return removeEmptyFieldFormObject({
    titleZH: title,
    titleEN: title,
    messageZH: message,
    messageEN: message,
    link: faker.datatype.boolean() ? faker.internet.url() : undefined,
    linkDescriptionZH: linkDescription,
    linkDescriptionEN: linkDescription,
    backgroundColor: faker.internet.color(),
    textColor: faker.internet.color(),
    isPublic: faker.datatype.boolean(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
