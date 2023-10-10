// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cityestate-715d5.firebaseapp.com",
  projectId: "cityestate-715d5",
  storageBucket: "cityestate-715d5.appspot.com",
  messagingSenderId: "54483883036",
  appId: "1:54483883036:web:9869e58a3748276b1dbbd9",
  measurementId: "G-MQKVCLNEJ7"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);