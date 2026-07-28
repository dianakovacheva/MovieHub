"use client";

import { useState } from "react";
import { signUp } from "../../../app/actions/user/auth";

export function RegisterForm({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        const result = await signUp(formData);

        // A successful sign up signs the user in and redirects to their
        // profile, so it never returns; only failures reach this point.
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
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="user@acme.com"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 text-gray-800 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 text-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">
          At least 8 characters, including a letter, a number, and a special
          character.
        </p>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-xs text-gray-600 uppercase"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 text-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {children}
    </form>
  );
}
