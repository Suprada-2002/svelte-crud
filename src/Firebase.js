import { initializeApp , getApps, getApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { browser } from "$app/environment";

console.log(import.meta.env.BASE_URL)
const firebaseConfig = {
  apiKey: "AIzaSyDm2CdqY_OSYLTkwKIWroFLQlbEWLxoRM8",
  authDomain: "svelteblogapp.firebaseapp.com",
  projectId: "svelteblogapp",
  storageBucket: "svelteblogapp.appspot.com",
  messagingSenderId: "955177790619",
  appId: "1:955177790619:web:bdbfeb0eba38f03213ea3e"
};

let app;
if(browser){
if(getApps().length === 0){
  app = initializeApp(firebaseConfig);
}else {
  getApp();
}
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleAuthProvider = new  GoogleAuthProvider();
