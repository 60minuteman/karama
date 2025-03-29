// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB1awm7SUn8-v7UCpcBZJgGWkNqK1-ZL6A',
  authDomain: 'karama-1bbb8.firebaseapp.com',
  projectId: 'karama-1bbb8',
  storageBucket: 'karama-1bbb8.firebasestorage.app',
  messagingSenderId: '418561663089',
  appId: '1:418561663089:web:4766aab566f085b6547bd0',
  measurementId: 'G-R0NMBMH7DV',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// setPersistence(auth, browserLocalPersistence)
//   .then(() => console.log('Persistence set'))
//   .catch((error) => console.error('Persistence error:', error));

export { auth, db };
export default app;
