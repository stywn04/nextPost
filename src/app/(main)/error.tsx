"use client"; // Error components must be Client Components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="py-20">
      <h2 className="font-bold text-lg text-red-500">Something went wrong!</h2>
      <div className="bg-red-500 py-1 px-4 rounded my-2">
        <span className="font-semibold">
          {error.name} : {error.message}
        </span>
      </div>
      <div className="flex justify-end items-center gap-2">
        <button
          className="bg-transparent border border-slate-500 py-1 px-4 rounded-md text-slate-500"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => router.push("/posts")
          }
        >
          Home
        </button>
        <button
          className="bg-transparent border border-red-500 py-1 px-4 rounded-md text-red-500"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
