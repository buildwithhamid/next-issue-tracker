import { collection, getDocs, Timestamp, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { TaskItem } from "../ContextFiles/TaskContext";
import { revalidateTag, unstable_cache } from "next/cache";

export interface Task {
    title: string;
    userId: string;
    description: string;
    showDesc: boolean;
    assignedTo: string;
    category: string;
    showCategory: boolean;
    dueDate: Date | String | Timestamp;
    priority: string;
    showPriority: boolean;
    status: string;
    showStatus: boolean;
    isPublic: boolean;
    createdAt?: string;
}

export async function createTask(task: TaskItem) {
    try {
        const docRef = doc(db, "tasks", task.id); // manually specify ID
        await setDoc(docRef, {
            ...task,
            createdAt: new Date().toISOString(),
        });
        // Revalidate the "tasks" cache
        revalidateTag("tasks");
        return task; // your ID is already in it
    } catch (error: any) {
        console.error("Error creating task:", error.message);
        throw new Error(error.message);
    }
}

export async function updatetask(taskId: string, updatedTask: Partial<Task>) {
    try {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, {
            ...updatedTask,
        });
        //Revalidate the "tasks" cache
        revalidateTag("tasks");
    } catch (error: any) {
        console.error("Error updating task:", error.message);
        throw new Error(error.message);
    }
}

export async function deleteTask(taskId: string) {
    try {
        const taskRef = doc(db, "tasks", taskId);
        await deleteDoc(taskRef);
        //Revalidate the "tasks" cache
        revalidateTag("tasks");
    } catch (error: any) {
        console.error("Error deleting task:", error.message);
        throw new Error(error.message);
    }
}

async function getTasksFromFirebase() {
    try {
        const snapshot = await getDocs(collection(db, "tasks"));
        const tasks = snapshot.docs.map(doc => {
            const data = doc.data();
            console.log(" data extracted from firebase, ", { data })

            return {
                id: doc.id,
                userId: data.userId,
                title: data.title,
                description: data.description,
                assignedTo: data.assignedTo,
                category: data.category,
                dueDate: data.dueDate,
                priority: data.priority,
                status: data.status,
                isPublic: data.isPublic,
                showCategory: data.showCategory,
                showDesc: data.showDesc,
                showPriority: data.showPriority,
                showStatus: data.showStatus,
            } as TaskItem;
        })

        return tasks;
    } catch (error: any) {
        console.error("Error fetching tasks:", error.message);
        throw new Error(error.message);
    }
}
 export const getTasks = unstable_cache(
    getTasksFromFirebase,
    ["tasks"],
    {
        tags: ["tasks"],
    }
 )