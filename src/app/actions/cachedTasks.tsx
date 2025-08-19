"use server";

import { unstable_cache } from "next/cache";
import {getTasksFromFirebase} from "@/app/Services/taskService"

// Wrap the pure fetch function in cache
export const getAllTasks = unstable_cache(
  getTasksFromFirebase,
  ["tasks"], // Cache key
  { tags: ["tasks"] } // Cache tags
);
