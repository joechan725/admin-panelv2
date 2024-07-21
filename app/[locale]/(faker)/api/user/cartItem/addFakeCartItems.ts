import { fakerZH_TW as faker } from '@faker-js/faker';
import { db } from '@/firebase/config';
import { generateFakeCartItem } from './generateFakeCartItem';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { getProducts } from '@/firebase/api/product/getProducts';

export const addFakeCartItems = async (maxNumberOfCartItems: number = 5) => {
  const products = await getProducts();

  const usersRef = collection(db, '/users');
  const usersSnap = await getDocs(usersRef);

  for (let i = 0; i < usersSnap.size; i++) {
    const numberOfCartItems = faker.number.int({ min: 0, max: maxNumberOfCartItems });
    const userId = usersSnap.docs.at(i)?.id;
    if (!userId) {
      continue;
    }

    const cartItemsRef = collection(db, `/users/${userId}/cartItems`);
    for (let j = 0; j < numberOfCartItems; j++) {
      const cartItem = generateFakeCartItem({ products });
      await addDoc(cartItemsRef, cartItem);
    }
    console.log(`Create Fake Cart Items ${i + 1}/${usersSnap.size}`);
  }
};
