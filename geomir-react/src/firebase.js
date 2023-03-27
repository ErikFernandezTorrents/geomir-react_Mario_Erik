// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFyTzdyCwdX8_OxE-XYTjkr-87UcAhFEo",
  authDomain: "placemarks-38425.firebaseapp.com",
  projectId: "placemarks-38425",
  storageBucket: "placemarks-38425.appspot.com",
  messagingSenderId: "139950274491",
  appId: "1:139950274491:web:7d5a2c03fa76b9a2bab69e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)