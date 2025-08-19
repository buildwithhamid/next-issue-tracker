import { collection, getDocs, Timestamp, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { TaskItem } from "../ContextFiles/TaskContext";
import { revalidateTasks } from "../actions/revalidateTasks";
import { FirebaseError } from "firebase/app";

export interface Task {
    title: string;
    userId: string;
    description: string;
    showDesc: boolean;
    assignedTo: string;
    category: string;
    showCategory: boolean;
    dueDate: Date | string | number;
    priority: string;
    showPriority: boolean;
    status: string;
    showStatus: boolean;
    isPublic: boolean;
    createdAt?: string;
}

export async function getTasksFromFirebase() {
    try {
        console.log("Fetching fresh tasks from Firestore...");
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
                dueDate: data.dueDate instanceof Timestamp
                    ? data.dueDate.toMillis() // number
                    : data.dueDate ?? null,
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
    } catch (error) {
        if (error instanceof FirebaseError) {
            console.error("Firebase error:", error.code, error.message);
            throw new Error(error.message);
        }
        console.error("Unexpected error:", (error as Error).message);
        throw error;
    }
}

export async function createTask(task: TaskItem) {
    try {
        const docRef = doc(db, "tasks", task.id); // manually specify ID
        await setDoc(docRef, {
            ...task,
            createdAt: new Date().toISOString(),
        });
        // Revalidate the "tasks" cache
        await revalidateTasks();
        return task; // your ID is already in it
    } catch (error) {
        if (error instanceof FirebaseError) {
            console.error("Firebase error:", error.code, error.message);
            throw new Error(error.message);
        }
        console.error("Unexpected error:", (error as Error).message);
        throw error;
    }
}

export async function updatetask(taskId: string, updatedTask: Partial<Task>) {
    try {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, {
            ...updatedTask,
        });
        //Revalidate the "tasks" cache
        await revalidateTasks();
    } catch (error) {
        if (error instanceof FirebaseError) {
            console.error("Firebase error:", error.code, error.message);
            throw new Error(error.message);
        }
        console.error("Unexpected error:", (error as Error).message);
        throw error;
    }
}

export async function deleteTask(taskId: string) {
    try {
        const taskRef = doc(db, "tasks", taskId);
        await deleteDoc(taskRef);
        //Revalidate the "tasks" cache
        await revalidateTasks();
    } catch (error) {
        if (error instanceof FirebaseError) {
            console.error("Firebase error:", error.code, error.message);
            throw new Error(error.message);
        }
        console.error("Unexpected error:", (error as Error).message);
        throw error;
    }
}

