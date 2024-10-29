// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQlBGMsXuXmwwJRARPieI1UAQGYtD-upM",
  authDomain: "lebanese-shop.firebaseapp.com",
  projectId: "lebanese-shop",
  storageBucket: "lebanese-shop.appspot.com",
  messagingSenderId: "425811742460",
  appId: "1:425811742460:web:db0a19b697afb00e21d179",
  measurementId: "G-D7G353NZ5R",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { db, storage };
