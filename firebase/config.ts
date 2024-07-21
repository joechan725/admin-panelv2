import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC-_Wahm-XrCd9lJzvGvFl5cPt_J3PMgcI',
  authDomain: 'sex-toy-store.firebaseapp.com',
  projectId: 'sex-toy-store',
  storageBucket: 'sex-toy-store.appspot.com',
  messagingSenderId: '639821915071',
  appId: '1:639821915071:web:3a3453b10cda4ddec3370a',
  measurementId: 'G-6Y3EPQSBZ6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
// export const analytics = getAnalytics(app);

// connection to local emulator
connectFirestoreEmulator(db, '127.0.0.1', 8080);
connectAuthEmulator(auth, `http://127.0.0.1:${9099}`);
connectStorageEmulator(storage, '127.0.0.1', 9199);
connectFunctionsEmulator(functions, '127.0.0.1', 5001);
