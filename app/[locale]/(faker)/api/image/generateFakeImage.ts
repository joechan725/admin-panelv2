import { fakerZH_TW as faker } from '@faker-js/faker';
import { Image } from '@/models/Image';

export const generateFakeImage = (alt?: string): Image => ({
  id: faker.string.uuid(),
  url: faker.image.url(),
  alt: alt ?? faker.commerce.productAdjective(),
});
