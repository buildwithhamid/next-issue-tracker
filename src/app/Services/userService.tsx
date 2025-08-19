import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FirebaseError } from "firebase/app";

export async function getAllUsersFromFirebase() {
  try {
    const snapshot = await getDocs(collection(db, "users"));
    const users = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: doc.id,
        email: data.email,
        username: data.username,
      };
    });
    return users;
  } catch (error) {
  if (error instanceof FirebaseError) {
    console.error("Firebase error:", error.code, error.message);
    throw new Error(error.message);
  }
  console.error("Unexpected error:", (error as Error).message);
  throw error;
}
}

