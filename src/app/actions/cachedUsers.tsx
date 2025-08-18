"use server";

import { unstable_cache } from "next/cache";
import { getAllUsersFromFirebase } from "../Services/userService";

// Wrap the pure fetch function in cache
export const getAllUsers = unstable_cache(
  getAllUsersFromFirebase,
  ["users"], // Cache key
  { tags: ["users"] } // Cache tags
);
