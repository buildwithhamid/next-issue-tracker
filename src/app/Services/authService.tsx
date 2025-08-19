import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, type DocumentData, } from "firebase/firestore";
import { auth, db } from "../firebase";
import { revalidateUsers } from "../actions/revalidateUsers";
import { FirebaseError } from "firebase/app";

// Login and return user data from Firestore
export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    let profile = {
      uid: user.uid,
      email: "task-manager@admn.com",
      username: "Admin",
    };

    if (docSnap.exists()) {
      const userData = docSnap.data() as DocumentData;
      profile = {
        uid: user.uid,
        email: userData.email,
        username: userData.username,
      };
    }

    return {
      credential: userCredential,
      profile,
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Firebase error:", error.code, error.message);
      throw new Error(error.message);
    }
    console.error("Unexpected error:", (error as Error).message);
    throw error;
  }
}

export async function signupUser(email: string, password: string, username: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user info in Firebase
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      username: username,
      createdAt: new Date().toISOString()
    })
    // Revalidate the cache 
    await revalidateUsers();
    return userCredential;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Firebase error:", error.code, error.message);
      throw new Error(error.message);
    }
    console.error("Unexpected error:", (error as Error).message);
    throw error;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    localStorage.clear();
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Firebase error:", error.code, error.message);
      throw new Error(error.message);
    }
    console.error("Unexpected error:", (error as Error).message);
    throw error;
  }
}