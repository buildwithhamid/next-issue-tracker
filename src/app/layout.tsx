// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import TaskProvider from "./ContextFiles/TaskContext";
import { ThemeProvider } from "./ContextFiles/theme_provider";
import { APIProvider } from "./ContextFiles/UsersContext";
import { AuthProvider } from "./ContextFiles/AuthContext";
import { ViewProvider } from "./ContextFiles/ViewContext";
import { TaskFieldProvider } from "./ContextFiles/TaskFieldsContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task manager",
  description: "Task manager app with contexts",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <TaskProvider>
          <TaskFieldProvider>
            <APIProvider>
              <AuthProvider>
                <ViewProvider>
                  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    {children}
                  </ThemeProvider>
                </ViewProvider>
              </AuthProvider>
            </APIProvider>
          </TaskFieldProvider>
        </TaskProvider>
      </body>
    </html>
  );
}
