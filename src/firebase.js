// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQg1YgI5zgi7sic-Kr7BRMZM-Kfp-RLXg",
  authDomain: "debanjan-portfolio-site.firebaseapp.com",
  projectId: "debanjan-portfolio-site",
  storageBucket: "debanjan-portfolio-site.appspot.com",
  messagingSenderId: "624463025353",
  appId: "1:624463025353:web:e4888ce6975278cca52918",
  measurementId: "G-TP4NHNETZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Optional: Enable persistence for Firestore
// import { enableIndexedDbPersistence } from 'firebase/firestore';
// enableIndexedDbPersistence(db).catch((err) => {
//     if (err.code == 'failed-precondition') {
//         console.log("Multiple tabs open, persistence can only be enabled in one tab at a a time.");
//     } else if (err.code == 'unimplemented') {
//         console.log("The current browser does not support all of the features required to enable persistence");
//     }
// });
