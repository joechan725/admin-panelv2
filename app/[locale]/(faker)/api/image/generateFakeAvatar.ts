import { fakerZH_TW as faker } from '@faker-js/faker';
import { Image } from '@/models/Image';

export const generateFakeAvatar = (alt?: string): Image => ({
  id: faker.string.uuid(),
  url: faker.image.avatarGitHub(),
  alt: alt ?? faker.internet.userName(),
});
