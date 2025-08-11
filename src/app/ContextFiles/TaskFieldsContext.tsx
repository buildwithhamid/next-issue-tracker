"use client"; 

import { createContext, useState, useContext, type ReactNode } from "react";

export type TaskFieldContextType = {
  showDescription: boolean;
  setShowDescription: (value: boolean) => void;
  showCategory: boolean;
  setShowCategory: (value: boolean) => void;
  showStatus: boolean;
  setShowStatus: (value: boolean) => void;
  showPriority: boolean;
  setShowPriority: (value: boolean) => void;
  isPublic: boolean;
  setIsPublic: (value: boolean) => void;
  resetFields: () => void;
};

export const TaskFieldContext = createContext<TaskFieldContextType | null>(null);

export const TaskFieldProvider = ({ children }: { children: ReactNode }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const resetFields = () => {
    setShowDescription(false);
    setShowCategory(false);
    setShowStatus(false);
    setShowPriority(false);
    setIsPublic(false);
  };

  return (
    <TaskFieldContext.Provider
      value={{
        showDescription,
        setShowDescription,
        showCategory,
        setShowCategory,
        showStatus,
        setShowStatus,
        showPriority,
        setShowPriority,
        isPublic,
        setIsPublic,
        resetFields,
      }}
    >
      {children}
    </TaskFieldContext.Provider>
  );
};

export const useTaskFieldContext = () => {
  const context = useContext(TaskFieldContext);
  if (!context) throw new Error("useTaskFieldContext must be used within TaskFieldProvider");
  return context;
};
