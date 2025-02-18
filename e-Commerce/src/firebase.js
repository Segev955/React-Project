import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAvofatCzPzsyEzYzBIK25PiLrvKttB54Y",
  authDomain: "e-commerce-622d1.firebaseapp.com",
  projectId: "e-commerce-622d1",
  storageBucket: "e-commerce-622d1.firebasestorage.app",
  messagingSenderId: "451627261649",
  appId: "1:451627261649:web:66234717fa597a6e13eff0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;