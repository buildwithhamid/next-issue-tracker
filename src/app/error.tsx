"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>Oops!</h1>
      <p>{error.message || "An unexpected error occurred."}</p>
      <pre className="overflow-x-auto">{error.stack}</pre>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}
