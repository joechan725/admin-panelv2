import { fakerZH_TW as faker } from '@faker-js/faker';
import { db } from '@/firebase/config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { getProducts } from '@/firebase/api/product/getProducts';
import { generateFakeWishlistItem } from './generateFakeWishlistItem';

export const addFakeWishlistItems = async (maxNumberOfWishlistItems: number = 5) => {
  const products = await getProducts();

  const usersRef = collection(db, '/users');
  const usersSnap = await getDocs(usersRef);

  for (let i = 0; i < usersSnap.size; i++) {
    const numberOfWishlistItems = faker.number.int({ min: 0, max: maxNumberOfWishlistItems });
    const userId = usersSnap.docs.at(i)?.id;
    if (!userId) {
      continue;
    }

    const wishlistItemsRef = collection(db, `/users/${userId}/wishlistItems`);
    for (let j = 0; j < numberOfWishlistItems; j++) {
      const wishlistItem = await generateFakeWishlistItem({ products });
      await addDoc(wishlistItemsRef, wishlistItem);
    }
    console.log(`Create Fake Wishlist Items ${i + 1}/${usersSnap.size}`);
  }
};
