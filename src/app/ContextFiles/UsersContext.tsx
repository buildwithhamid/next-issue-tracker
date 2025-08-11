"use client"; 

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllUsers } from '@/app/Services/userService';

interface UserData {
    uid: string;
    email: string;
    username: string;
}

interface APIContextType {
    users: UserData[];
    fetchUsers: () => Promise<void>;
}

const APIContext = createContext<APIContextType | null>(null);

export const APIProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [users, setUsers] = useState<UserData[]>([]);

  const fetchUsers = async () => {
    try{
        const data = await getAllUsers();
        setUsers(data);
    }catch(error){
        console.error("Failed to fetch users:", error);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <APIContext.Provider value={{ users, fetchUsers }}>
      {children}
    </APIContext.Provider>
  );
}
export const useAPIContext = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useAPIContext must be used within an APIProvider");
  }
  return context;
};