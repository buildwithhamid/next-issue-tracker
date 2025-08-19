"use server";

import { revalidateTag } from "next/cache";

export async function revalidateTasks(){
    revalidateTag("tasks");
}