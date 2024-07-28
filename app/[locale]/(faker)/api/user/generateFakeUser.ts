import { fakerZH_TW as faker } from '@faker-js/faker';
import { User } from '@/models/user/User';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { generateFakeAvatar } from '../image/generateFakeAvatar';

export interface UserData
  extends Omit<User, 'id' | 'dateOfBirth' | 'createdAt' | 'registeredAt' | 'updatedAt' | 'lastLoggedInAt'> {
  dateOfBirth?: Date;
  createdAt: FieldValue;
  registeredAt?: FieldValue;
  updatedAt: FieldValue;
  lastLoggedInAt: FieldValue;
}

const providerIds = [
  'password',
  'emailLink',
  'phone',
  'google.com',
  'apple.com',
  'facebook.com',
  'twitter.com',
  'github.com',
];

const genders: User['gender'][] = ['Men', 'Women'];

export const generateFakeUser = (): UserData => {
  const isAnonymous = faker.datatype.boolean();
  const isAdmin = isAnonymous ? false : faker.number.int({ min: 0, max: 100 }) <= 5;
  const role = isAdmin ? 'admin' : isAnonymous ? 'anonymous' : 'user';

  const username = !isAnonymous && faker.datatype.boolean() ? faker.internet.userName() : undefined;

  return removeEmptyFieldFormObject({
    firstName: !isAnonymous && faker.datatype.boolean() ? faker.person.firstName() : undefined,
    lastName: !isAnonymous && faker.datatype.boolean() ? faker.person.lastName() : undefined,
    username,
    email: !isAnonymous && faker.datatype.boolean() ? faker.internet.email() : undefined,
    gender:
      !isAnonymous && faker.datatype.boolean()
        ? genders[faker.number.int({ min: 0, max: genders.length - 1 })]
        : undefined,
    phoneNumber: !isAnonymous && faker.datatype.boolean() ? faker.phone.number() : undefined,
    avatar: !isAnonymous && faker.datatype.boolean() ? generateFakeAvatar(username) : undefined,
    isAdmin,
    isAnonymous,
    role,
    emailVerified: !isAnonymous && faker.datatype.boolean(),
    providerData: !isAnonymous && faker.datatype.boolean() ? [] : undefined,
    providerId:
      !isAnonymous && faker.datatype.boolean()
        ? providerIds[faker.number.int({ min: 0, max: providerIds.length - 1 })]
        : undefined,
    dateOfBirth:
      !isAnonymous && faker.datatype.boolean() ? new Date(faker.date.birthdate({ mode: 'year' })) : undefined,
    createdAt: serverTimestamp(),
    registeredAt: !isAnonymous ? serverTimestamp() : undefined,
    updatedAt: serverTimestamp(),
    lastLoggedInAt: serverTimestamp(),
  });
};
