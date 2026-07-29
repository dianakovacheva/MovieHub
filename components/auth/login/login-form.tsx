"use client";

import { useState } from "react";
import { login } from "../../../app/actions/user/auth";

const fieldClassName =
  "mt-1.5 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow dark:border-zinc-600 dark:bg-[#1a1a1a] dark:text-white dark:placeholder:text-zinc-500";

const labelClassName =
  "block text-sm font-semibold text-zinc-800 dark:text-zinc-100";

export function LoginForm({
  children,
  redirectTo = "/",
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        formData.set("redirectTo", redirectTo);
        const result = await login(formData);

        if (result?.message) {
          setError(result.message);
        } else if (result?.errors) {
          const firstError =
            result.errors.email?.[0] ?? result.errors.password?.[0];
          setError(firstError ?? "Invalid credentials. Please try again.");
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
          autoComplete="current-password"
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
