import { fakerZH_TW as faker } from '@faker-js/faker';
import { Product } from '@/models/product/Product';
import { CartItem } from '@/models/user/cartItem/CartItem';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';

interface CartItemData extends Omit<CartItem, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

interface GenerateFakeCartItemParameters {
  products: Product[];
}

export const generateFakeCartItem = ({ products }: GenerateFakeCartItemParameters): CartItemData => {
  const randomProduct = products[faker.number.int({ min: 0, max: products.length - 1 })];

  const {
    id: productId,
    nameZH,
    nameEN,
    brandId,
    brandNameEN,
    brandNameZH,
    categoryId,
    categoryNameEN,
    categoryNameZH,
    collectionId,
    collectionNameEN,
    collectionNameZH,
    stock,
    markedPrice,
    sellingPrice,
    descriptionZH,
    descriptionEN,
    images,
  } = randomProduct;

  return removeEmptyFieldFormObject({
    productId,
    nameEN,
    nameZH,
    brandId,
    brandNameEN,
    brandNameZH,
    categoryId,
    categoryNameEN,
    categoryNameZH,
    collectionId,
    collectionNameEN,
    collectionNameZH,
    descriptionEN,
    descriptionZH,
    image: images?.[0],
    stock,
    markedPrice,
    sellingPrice,
    quantity: faker.number.int({ min: 1, max: 10 }),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
