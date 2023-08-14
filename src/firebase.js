import { initializeApp } from "firebase/app";
 import {getFirestore} from "firebase/firestore"
 import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyBHqz6NKXFUrZTFKw8nAtk4hUuUfNyNO2o",
  authDomain: "crud-img-9a9c8.firebaseapp.com",
  projectId: "crud-img-9a9c8",
  storageBucket: "crud-img-9a9c8.appspot.com",
  messagingSenderId: "886163805789",
  appId: "1:886163805789:web:3afef90f0d14a62d13dfb4"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const storage = getStorage(app);