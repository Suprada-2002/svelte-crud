import { initializeApp , getApps, getApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { browser } from "$app/environment";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_API_ID
};

let app = initializeApp(firebaseConfig);
/*
if(browser){
if(getApps().length === 0){
  app = initializeApp(firebaseConfig);
}else {
  getApp();
}
}
*/
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleAuthProvider = new  GoogleAuthProvider();
