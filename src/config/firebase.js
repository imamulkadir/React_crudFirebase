// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeCQRxQrnv7Vc8o5WaoiJG4jWV8LqfA-c",
  authDomain: "vite-contact-80614.firebaseapp.com",
  projectId: "vite-contact-80614",
  storageBucket: "vite-contact-80614.firebasestorage.app",
  messagingSenderId: "837675916935",
  appId: "1:837675916935:web:3355c51d721f5e1a34a222",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
