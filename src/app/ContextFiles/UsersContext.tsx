"use client";

import React, { createContext, useContext, useState } from "react";

interface UserData {
  uid: string;
  email: string;
  username: string;
}

interface APIContextType {
  users: UserData[];
  setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
}

const APIContext = createContext<APIContextType | null>(null);

export const APIProvider: React.FC<{ children: React.ReactNode; initialUsers: UserData[] }> = ({
  children,
  initialUsers,
}) => {
  const [users, setUsers] = useState(initialUsers);
  return <APIContext.Provider value={{ users, setUsers }}>{children}</APIContext.Provider>;
};

export const useAPIContext = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useAPIContext must be used within an APIProvider");
  }
  return context;
};
