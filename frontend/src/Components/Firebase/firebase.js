// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhrCvu9HbDZ6EsoV2t-tr1yZnT8YJx34o",
  authDomain: "uploadingfile-ef68c.firebaseapp.com",
  projectId: "uploadingfile-ef68c",
  storageBucket: "uploadingfile-ef68c.appspot.com",
  messagingSenderId: "51897013540",
  appId: "1:51897013540:web:2085c0d2c258532b0c8fb1",
  measurementId: "G-M85CVK4WJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  storage = getStorage(app);