"use server";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { unstable_cache } from "next/cache";

async function getAllUsersFromFirebase() {
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
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    throw new Error(error.message);
  }
}

export const getAllUsers = unstable_cache(
  getAllUsersFromFirebase,
  ["users"],
  {tags: ["users"]}
)
