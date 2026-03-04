"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mt-5 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-medium before:content-['>'] before:mr-1">Something went wrong</h1>
        <p className="text-base-content/80">An error occurred. You can try again or go back home.</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="text-sm font-medium underline hover:text-base-content/80"
          >
            Try again
          </button>
          <a href="/" className="text-sm font-medium underline hover:text-base-content/80">
            Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
