import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCgF47Hwekrz8AvAkSq2jryzPTrG9izC0Q",
  authDomain: "donyia-87266.firebaseapp.com",
  projectId: "donyia-87266",
  storageBucket: "donyia-87266.appspot.com",
  messagingSenderId: "417704491552",
  appId: "1:417704491552:web:2cf636dbda41761701da45",
  measurementId: "G-Y2KPHJBXYH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth();
export const storage=getStorage(app);
