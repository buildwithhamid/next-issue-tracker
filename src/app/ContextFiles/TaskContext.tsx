"use client"; 

import type { Timestamp } from "firebase/firestore";
import React, { createContext, useEffect, useState, type ReactNode } from "react";
import { createTask, deleteTask, getTasks, updatetask } from "../Services/taskService";

export interface TaskItem {
    id: string;
    userId: string;
    title: string;
    description: string;
    showDesc: boolean,
    assignedTo: string;
    category: string;
    showCategory: boolean,
    dueDate: Date | string | Timestamp;
    priority: string;
    showPriority: boolean,
    status: string;
    showStatus: boolean,
    isPublic: boolean;
}

interface TaskContextType {
    taskData: TaskItem[];
    addTask: (task: TaskItem) => void;
    removeTask: (id: string) => void;
    updateTask: (id: string, updatedTask: Partial<TaskItem>) => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);

interface TaskProviderProps {
    children: ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {

    const [taskData, setTaskData] = useState<TaskItem[]>([]);

    useEffect(() => {
        async function loadTasks() {
            try {
                const tasksFromFirestore = await getTasks();
                setTaskData(tasksFromFirestore);
            } catch (error) {
                console.error("Error loading tasks:", error);
            }
        }
        loadTasks();
    }, []);

    useEffect(() => {
        if (taskData.length > 0) {
            console.log("Updated taskData with flags:", taskData);
        }
    }, [taskData]);

    const addTask = async (task: TaskItem) => {
        try {
            await createTask(task);
            setTaskData(prev => [...prev, task]);
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    const removeTask = async (id: string) => {
        try {
            await deleteTask(id);
            setTaskData((prev) => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Failed to remove task:", error);
        }
    };

    const updateTask = async (id: string, updatedTask: Partial<TaskItem>) => {
        try {
            await updatetask(id, updatedTask);
            setTaskData((prev) =>
                prev.map(item =>
                    item.id === id ? { ...item, ...updatedTask } : item
                )
            );
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    return (
        <TaskContext.Provider value={{ taskData, addTask, removeTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
