"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../ContextFiles/AuthContext";
import { Spinner } from "../views/imports";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userId, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !userId) {
      router.replace("/views/login");
    }
  }, [userId, loading, router]);

  if (loading || (!userId && typeof window !== "undefined")) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}
