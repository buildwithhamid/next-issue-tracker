"use client";

import type { Timestamp } from "firebase/firestore";
import React, { createContext, useState, type ReactNode } from "react";
import { createTask, deleteTask, updatetask } from "../Services/taskService";
import { revalidateTasks } from "../actions/revalidateTasks";

export interface TaskItem {
  id: string;
  userId: string;
  title: string;
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
  initialTasks: TaskItem[];
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children, initialTasks }) => {
  const [taskData, setTaskData] = useState<TaskItem[]>(initialTasks);

  const addTask = async (task: TaskItem) => {
    try {
      await createTask(task);
      setTaskData(prev => [...prev, task]);
      console.log("Before revalidating tasks at", new Date().toISOString());

      // revalidateTasks;
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTaskData(prev => prev.filter(item => item.id !== id));
      console.log("Before revalidating tasks at", new Date().toISOString());

      // revalidateTasks;
    } catch (error) {
      console.error("Failed to remove task:", error);
    }
  };

  const updateTask = async (id: string, updatedTask: Partial<TaskItem>) => {
    try {
      await updatetask(id, updatedTask);
      setTaskData(prev =>
        prev.map(item => (item.id === id ? { ...item, ...updatedTask } : item))
      );
      console.log("Before revalidating tasks at", new Date().toISOString());

      // revalidateTasks;
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
