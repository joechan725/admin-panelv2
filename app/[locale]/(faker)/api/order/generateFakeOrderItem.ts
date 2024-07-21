import { Product } from '@/models/product/Product';
import { OrderItem } from '@/models/order/OrderItem';
import { addDoc, collection, FieldValue, serverTimestamp, Timestamp } from 'firebase/firestore';
import { fakerZH_TW as faker } from '@faker-js/faker';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { db } from '@/firebase/config';
import { Comment } from '@/models/comment/Comment';
import { User } from '@/models/user/User';

interface AddCommentData extends Omit<Comment, 'id' | 'rating' | 'createdAt' | 'updatedAt' | 'title' | 'content'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

interface GenerateFakeOrderItemParameters {
  products: Product[];
  user: User;
}

export const generateFakeOrderItem = async ({
  products,
  user,
}: GenerateFakeOrderItemParameters): Promise<OrderItem> => {
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

  const {
    id: userId,
    role: userRole,
    avatar: userAvatar,
    email: userEmail,
    firstName: userFirstName,
    lastName: userLastName,
  } = user;

  const quantity = faker.number.int({ min: 1, max: 10 });

  const commentsRef = collection(db, '/comments');

  const commentData: AddCommentData = removeEmptyFieldFormObject({
    boughtQuantity: quantity,
    productId,
    productNameZH: nameZH,
    productNameEN: nameEN,
    productDescriptionEN: descriptionEN,
    productDescriptionZH: descriptionZH,
    productImage: images?.[0],
    userId,
    userRole,
    userAvatar,
    userEmail,
    userFirstName,
    userLastName,
    images: [],
    published: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const res = await addDoc(commentsRef, commentData);

  const commentId = res.id;

  return removeEmptyFieldFormObject({
    id: productId,
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
    quantity,
    commentId,
  });
};
