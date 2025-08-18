"use server";

import { revalidateTag } from "next/cache";

export async function revalidateTasks(){
      console.log("♻️ revalidating tasks at", new Date().toISOString());

    revalidateTag("tasks");
}