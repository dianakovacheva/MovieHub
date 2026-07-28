"use client";

import { useState } from "react";
import { signUp } from "../../../app/actions/user/auth";

const fieldClassName =
  "mt-1.5 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-[#f5c518] focus:ring-1 focus:ring-[#f5c518] dark:border-zinc-600 dark:bg-[#1a1a1a] dark:text-white dark:placeholder:text-zinc-500";

const labelClassName =
  "block text-sm font-semibold text-zinc-800 dark:text-zinc-100";

export function RegisterForm({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        const result = await signUp(formData);

        if (result?.message) {
          setError(result.message);
        } else if (result?.errors) {
          const firstError =
            result.errors.email?.[0] ??
            result.errors.password?.[0] ??
            result.errors.confirmPassword?.[0];
          setError(
            firstError ?? "Could not create your account. Please try again.",
          );
        }
      }}
      className="flex flex-col gap-4"
    >
      <div>
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          className={fieldClassName}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClassName}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          className={fieldClassName}
        />
        <p className="mt-1.5 text-xs text-zinc-500 dark:text-[#c0bcbc]">
          At least 8 characters, including a letter, a number, and a special
          character.
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className={labelClassName}>
          Re-enter password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          className={fieldClassName}
        />
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </p>
      )}

      {children}
    </form>
  );
}
