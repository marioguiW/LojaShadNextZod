// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUQsqF45f5wIS7F5lYF61GeC1d1Y5iOkk",
  authDomain: "e-commerce-12607.firebaseapp.com",
  projectId: "e-commerce-12607",
  storageBucket: "e-commerce-12607.appspot.com",
  messagingSenderId: "622384684670",
  appId: "1:622384684670:web:c5169e16594e9442cc422f",
  measurementId: "G-S99VMNERSY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage()