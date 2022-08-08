// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtrUZDS1squoQj5n81BwYaEix2Y87RFdo",
  authDomain: "fir-practice-4395d.firebaseapp.com",
  projectId: "fir-practice-4395d",
  storageBucket: "fir-practice-4395d.appspot.com",
  messagingSenderId: "269056871272",
  appId: "1:269056871272:web:98b31d3c607439358364dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const aut = getAuth();
