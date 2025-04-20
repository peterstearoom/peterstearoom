// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8i-6q4w8qU2c2x0ibJRXFyeOOXJcEjuE",
  authDomain: "peters-tearoom.firebaseapp.com",
  databaseURL: "https://peters-tearoom-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "peters-tearoom",
  storageBucket: "peters-tearoom.firebasestorage.app",
  messagingSenderId: "637825341624",
  appId: "1:637825341624:web:cd0e654ed343342a2abc4d"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };