import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA85P3GW-SOyOnNI13EekY_1NhoMk4MpkE",
  authDomain: "final-hackathon-smit.firebaseapp.com",
  projectId: "final-hackathon-smit",
  storageBucket: "final-hackathon-smit.appspot.com",
  messagingSenderId: "131379841437",
  appId: "1:131379841437:web:0c1a1558bd8e35237f8774"
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage()

export {auth , db, storage};