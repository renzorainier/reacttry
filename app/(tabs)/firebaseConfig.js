// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration (replace with your own Firebase project credentials)
const firebaseConfig = {
  apiKey: 'AIzaSyCKQFDn6C1RUNqwZo-2mDO6rlpRX3TJyzc',
  authDomain: 'mobcom-760a2.firebaseapp.com',
  projectId: 'mobcom-760a2',
  storageBucket: 'mobcom-760a2.appspot.com',
  messagingSenderId: '320723251437',
  appId: '1:320723251437:web:4783a8beb59a18c20ddce4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
