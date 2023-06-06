import { initializeApp , getApps, getApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { browser } from "$app/environment";
import {API_ID, API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET,
MESSAGE_SENDER_ID} from '../secret';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId:MESSAGE_SENDER_ID,
  appId:API_ID
};

let app;

if(browser){
if(getApps().length === 0){
  app = initializeApp(firebaseConfig);
}else{
  getApp();
}}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleAuthProvider = new  GoogleAuthProvider();
