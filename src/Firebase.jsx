// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import {  GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3YSdheV0uy2_lj8VzcpMjETvSRD0vMwg",
  authDomain: "fir-authentication-fa6c5.firebaseapp.com",
  projectId: "fir-authentication-fa6c5",
  storageBucket: "fir-authentication-fa6c5.firebasestorage.app",
  messagingSenderId: "225758876501",
  appId: "1:225758876501:web:0079c2edb837c1744ad5dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
export const auth=getAuth()
export const provider = new GoogleAuthProvider();

export const db=getFirestore(app)