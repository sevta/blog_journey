// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA16o3S-b5kyTC6HItFZsJ35JqYKpvCa7I",
  authDomain: "agres-aa9cd.firebaseapp.com",
  projectId: "agres-aa9cd",
  storageBucket: "agres-aa9cd.appspot.com",
  messagingSenderId: "1049534383333",
  appId: "1:1049534383333:web:50aad239dc5d0d93ba800c",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore();
export const authUser = getAuth();
export const storage = getStorage(firebase);