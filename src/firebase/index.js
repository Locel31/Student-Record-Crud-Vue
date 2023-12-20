// Import the functions you need from the SDKs you need
import {Timestamp as firestireTimestamp, getFirestore, deleteDoc as firestoreDeleteDoc, setDoc as firestoreSetDoc, doc as firestoreDoc ,collection as firestoreCollection, addDoc as firestoreAddDoc, onSnapshot as firestoreOnSnapshot, orderBy as firestoreOrderBy, getDocs as firestoreGetDocs, getDoc as firestoreGetDoc, updateDoc as firestoreUpdateDoc} from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnRiefTkzEZ8Jiqcfnf2MUDawztyFarQU",
  authDomain: "student-record-de655.firebaseapp.com",
  projectId: "student-record-de655",
  storageBucket: "student-record-de655.appspot.com",
  messagingSenderId: "816514750185",
  appId: "1:816514750185:web:dd0b90ad0a2fc5c6008278",
  measurementId: "G-8P76SG988J"
};
const dateTimetampNow = firestireTimestamp.now();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db, firestoreSetDoc as setDoc, firestoreDoc as doc, firestoreOrderBy as orderBy, firestoreCollection as collection, firestoreAddDoc as addDoc, firestoreOnSnapshot as onSnapshot, firestoreGetDocs as  getDocs, firestoreGetDoc as getDoc, firestoreDeleteDoc as deleteDoc, dateTimetampNow as Timestamp, firestoreUpdateDoc as updateDoc};
