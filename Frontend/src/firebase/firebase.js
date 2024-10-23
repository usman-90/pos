// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP5aJmeJrdqm09ylA2bC15TSgg2aU_JrE",
  authDomain: "apple-2468e.firebaseapp.com",
  projectId: "apple-2468e",
  storageBucket: "apple-2468e.appspot.com",
  messagingSenderId: "1016203503079",
  appId: "1:1016203503079:web:2dfc5b3934ded516bf4942",
  measurementId: "G-TM8VN9Z2G0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
