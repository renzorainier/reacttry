// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration (replace with your own Firebase project credentials)
const firebaseConfig = {
  apiKey: "AIzaSyAdkGqnV0LoPn-zx4RuIctUFKx7jHioNA8",
  authDomain: "finalprojmobcomp.firebaseapp.com",
  projectId: "finalprojmobcomp",
  storageBucket: "finalprojmobcomp.appspot.com",
  messagingSenderId: "161357362360",
  appId: "1:161357362360:web:23aed8a503b8812868304d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
