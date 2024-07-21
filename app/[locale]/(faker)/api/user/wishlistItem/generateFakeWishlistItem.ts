import { fakerZH_TW as faker } from '@faker-js/faker';
import { Product } from '@/models/product/Product';
import { WishlistItem } from '@/models/user/wishlistItem/WishlistItem';
import { FieldValue, serverTimestamp, Timestamp } from 'firebase/firestore';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';

interface WishlistItemData extends Omit<WishlistItem, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

interface GenerateFakeWishlistItemParameters {
  products: Product[];
}

export const generateFakeWishlistItem = ({ products }: GenerateFakeWishlistItemParameters): WishlistItemData => {
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
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
