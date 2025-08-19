import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "./ContextFiles/theme_provider";
import { AuthProvider } from "./ContextFiles/AuthContext";
import { ViewProvider } from "./ContextFiles/ViewContext";
import { TaskFieldProvider } from "./ContextFiles/TaskFieldsContext";
import { Metadata } from "next";
import APIProviderWrapper from "./ContextFiles/APIProviderWrapper";
import TaskProviderWrapper from "./ContextFiles/TaskProviderWrapper";

export const metadata: Metadata = {
  title: "Task manager",
  description: "Task manager app with contexts",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <TaskProviderWrapper>
          <TaskFieldProvider>
            <APIProviderWrapper>
              <AuthProvider>
                <ViewProvider>
                  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    {children}
                  </ThemeProvider>
                </ViewProvider>
              </AuthProvider>
            </APIProviderWrapper>
          </TaskFieldProvider>
        </TaskProviderWrapper>
      </body>
    </html>
  );
}
