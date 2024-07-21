import { fakerZH_TW as faker } from '@faker-js/faker';
import { Product } from '@/models/product/Product';
import { generateFakeImage } from '../image/generateFakeImage';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Brand } from '@/models/classification/brand/Brand';
import { Category } from '@/models/classification/category/Category';
import { Collection } from '@/models/classification/collection/Collection';

interface ProductData extends Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt?: FieldValue;
}

interface GenerateFakeProductParameters {
  brands: Brand[];
  categories: Category[];
  collections: Collection[];
}

export const generateFakeProduct = ({
  brands,
  categories,
  collections,
}: GenerateFakeProductParameters): ProductData => {
  const name = faker.commerce.productName();
  const description = faker.datatype.boolean() ? faker.commerce.productDescription() : undefined;
  const detail = faker.datatype.boolean() ? faker.commerce.productDescription() : undefined;

  const markedPrice = faker.number.int({ min: 1, max: 1000 });
  const sellingPrice = faker.datatype.boolean() ? faker.number.int({ min: 1, max: markedPrice }) : undefined;

  const randomBrand =
    faker.datatype.boolean() && brands.length > 0
      ? brands[faker.number.int({ min: 0, max: brands.length - 1 })]
      : undefined;
  const randomCategory =
    faker.datatype.boolean() && categories.length > 0
      ? categories[faker.number.int({ min: 0, max: categories.length - 1 })]
      : undefined;
  const randomCollection =
    faker.datatype.boolean() && collections.length > 0
      ? collections[faker.number.int({ min: 0, max: collections.length - 1 })]
      : undefined;

  return removeEmptyFieldFormObject({
    nameZH: name,
    nameEN: name,
    isPublic: faker.datatype.boolean(),
    descriptionZH: description,
    descriptionEN: description,
    images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => generateFakeImage(name)),
    sellingPrice,
    markedPrice,
    stock: faker.number.int({ min: 0, max: 1000 }),
    brandId: randomBrand?.id,
    brandNameZH: randomBrand?.nameZH,
    brandNameEN: randomBrand?.nameEN,
    categoryId: randomCategory?.id,
    categoryNameZH: randomCategory?.nameZH,
    categoryNameEN: randomCategory?.nameEN,
    collectionId: randomCollection?.id,
    collectionNameZH: randomCollection?.nameZH,
    collectionNameEN: randomCollection?.nameEN,
    tags: name.split(' '),
    detailZH: detail,
    detailEN: detail,
    detailImages: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => generateFakeImage(name)),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
