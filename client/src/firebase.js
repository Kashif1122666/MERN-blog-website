// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "skills-exchange-9f89d.firebaseapp.com",
  projectId: "skills-exchange-9f89d",
  storageBucket: "skills-exchange-9f89d.firebasestorage.app",
  messagingSenderId: "337925973732",
  appId: "1:337925973732:web:50951aeb8eada13b4d2ef1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);