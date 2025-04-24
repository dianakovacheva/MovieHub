import Link from "next/link";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense>
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-[#121212] text-center p-6">
        <h1 className="text-6xl font-bold text-zinc-800 dark:text-white">
          404
        </h1>
        <p className="text-xl text-zinc-600 dark:text-white mt-2">
          Page Not Found
        </p>
        <p className="text-zinc-500 dark:text-white mt-4">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 px-6 py-2 bg-[#f5c518] hover:bg-[#e3b614] shadow-sm text-black rounded-lg rounded-full"
        >
          Go to Homepage
        </Link>
      </div>
    </Suspense>
  );
}
