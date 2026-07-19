// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const api_key = import.meta.env.VITE_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: api_key,
  authDomain: "mail-box-client-57b55.firebaseapp.com",
  databaseURL: "https://mail-box-client-57b55-default-rtdb.firebaseio.com",
  projectId: "mail-box-client-57b55",
  storageBucket: "mail-box-client-57b55.firebasestorage.app",
  messagingSenderId: "336137140756",
  appId: "1:336137140756:web:e66897599de86817410501"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)