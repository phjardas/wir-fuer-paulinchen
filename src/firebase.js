import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8VccsawtE-N9vV6pVeBcBG6s4rmhQ4Wk",
  authDomain: "wir-fuer-paulinchen.firebaseapp.com",
  projectId: "wir-fuer-paulinchen",
  storageBucket: "wir-fuer-paulinchen.appspot.com",
  messagingSenderId: "263755624905",
  appId: "1:263755624905:web:94d943227602eb1bba7818",
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);
