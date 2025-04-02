import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8RPb3qckMuleM3IW_b_AfRq_hDeI8d18",
  authDomain: "econference-e508a.firebaseapp.com",
  projectId: "econference-e508a",
  storageBucket: "econference-e508a.appspot.com",
  messagingSenderId: "628575634022",
  appId: "1:628575634022:web:0a71f1ad3c75e9509923a7",
  measurementId: "G-P5B2E27K9X",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
