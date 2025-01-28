import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQ_ghpYDwf5OZ_7huYSIxQe7z3Msvgxbs",
  authDomain: "task-buddy-c3477.firebaseapp.com",
  projectId: "task-buddy-c3477",
  storageBucket: "task-buddy-c3477.firebasestorage.app",
  messagingSenderId: "414163723181",
  appId: "1:414163723181:web:abfbb4d53f5cbe35893724",
  measurementId: "G-D9J6HGDYRY"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
    })
    .catch((error) => {
      console.error(error);
    });
};

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log('User signed out');
    })
    .catch((error) => {
      console.error(error);
    });
};

export { auth, signInWithGoogle, signOutUser };