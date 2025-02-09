// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

// Firebase configuration
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
const db = getFirestore(app);

// Fetch tasks from Firestore
export const fetchTasks = async () => {
    console.log('Calling fetchTasks function...');
    console.log('Fetching tasks from Firestore...');
    try {
        console.log('Attempting to retrieve tasks from Firestore...');
        const tasksSnapshot = await getDocs(collection(db, 'tasks'));
        console.log('Tasks retrieved from Firestore. Processing tasks...');
        const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Tasks processed successfully:', tasksList);
        console.log('Returning tasks list...');
        return tasksList;
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

// Export the Firestore database
export { db };
