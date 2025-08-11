// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDArxmqeX31H0eJO1HGdxTrIdnyZdA-F7g",
  authDomain: "task-manager-c338d.firebaseapp.com",
  projectId: "task-manager-c338d",
  storageBucket: "task-manager-c338d.appspot.com",
  messagingSenderId: "910480695707",
  appId: "1:910480695707:web:a4595c5bdb0d3d73bb413e",
  measurementId: "G-XVF3D1Y5M4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ✅ Optional: Initialize analytics only in supported environments
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    } else {
      console.warn("Firebase Analytics not supported in this environment.");
    }
  });
}

export { app, auth, db };
