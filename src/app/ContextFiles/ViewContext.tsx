"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"

type ViewType = "Admin" | "User"

const ViewContext = createContext<{
  view: ViewType
  setView: (view: ViewType) => void
}>({
  view: "Admin",
  setView: () => {},
})

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const { email } = useAuth()

  const getInitialView = (): ViewType => {
    if(email === "task-manager@admn.com") return "Admin"
    return "User"
  }

  const [view, setView] = useState<ViewType>(getInitialView)

  // Recheck if email changes
  useEffect(() => {
    setView(getInitialView())
  }, [email])

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  )
}

export const useView = () => useContext(ViewContext)
