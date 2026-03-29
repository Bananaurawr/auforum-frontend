// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0NTQa_U-n_BmrJ2vAEbwsnTe-Y5nZ7F0",
  authDomain: "ankuforum.firebaseapp.com",
  projectId: "ankuforum",
  storageBucket: "ankuforum.firebasestorage.app",
  messagingSenderId: "54035246760",
  appId: "1:54035246760:web:deacd7e6f4316d3ffe9c9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;