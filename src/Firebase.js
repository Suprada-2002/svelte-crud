import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDm2CdqY_OSYLTkwKIWroFLQlbEWLxoRM8",
  authDomain: "svelteblogapp.firebaseapp.com",
  projectId: "svelteblogapp",
  storageBucket: "svelteblogapp.appspot.com",
  messagingSenderId: "955177790619",
  appId: "1:955177790619:web:bdbfeb0eba38f03213ea3e"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleAuthProvider = new  GoogleAuthProvider();
