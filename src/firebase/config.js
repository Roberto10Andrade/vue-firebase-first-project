import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnoAirHb1wsztZ5Dg3EIReg6s-4J6m1z8",
  authDomain: "first-project-afe3c.firebaseapp.com",
  projectId: "first-project-afe3c",
  storageBucket: "first-project-afe3c.firebasestorage.app",
  messagingSenderId: "864342141729",
  appId: "1:864342141729:web:347f9e4e494c4f9aa72c60",
  measurementId: "G-S4YR6NR0SJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
