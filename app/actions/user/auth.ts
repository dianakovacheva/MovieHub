"use server";

import { db } from "../../db/index";
import { users } from "../../db/schema";
import { FormState, LoginFormSchema, SignUpFormSchema } from "./definitions";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { signIn, signOut } from "../../../auth";
import { AuthError } from "next-auth";

// Sign Up
export async function signUp(
  // state: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data;

  // 3. Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { message: "An account with this email already exists." };
  }

  // Hash password and save user
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);

  // 4. Insert the user into the database
  const data = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id });

  const user = data[0];

  if (!user) {
    return { message: "Failed to create user. Please try again." };
  }

  // Automatically sign in the user and send them to their profile page.
  // On success this throws a redirect (handled by Next.js); only auth
  // failures are caught below.
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: true,
      redirectTo: `/user/${user.id}`,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "Could not sign you in. Please try again." };
    }
    throw error; // Re-throw redirects and other framework errors
  }
}

// Login
export async function login(formData: FormData): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // On success signIn throws a redirect (handled by Next.js); we only catch
  // authentication errors so bad credentials show a friendly message.
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: true,
      redirectTo: formData.get("redirectTo")?.toString() || "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "Invalid credentials. Please try again." };
    }
    throw error; // Re-throw redirects and other framework errors
  }
}

// Logout
export async function logout() {
  await signOut({ redirect: true, redirectTo: "/login" });
}
