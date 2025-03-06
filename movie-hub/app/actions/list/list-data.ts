"use server";

import { lists } from "./../../db/schema";
import { db } from "../../db";
import { CreateListFormSchema, CreateListFormState } from "./definitions";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

// Create list
export async function createList(
  formData: FormData,
  userId: string
): Promise<CreateListFormState> {
  // 1. Validate form fields
  const validatedFields = CreateListFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, description } = validatedFields.data;

  // 3. Check if list already exists
  const existingList = await db
    .select()
    .from(lists)
    .where(eq(lists.name, name))
    .limit(1);

  if (existingList.length > 0) {
    return { errors: { name: ["List already exists."] } };
  }

  // 4. Insert the list into the database
  const insertedList = await db
    .insert(lists)
    .values({
      name,
      description: description || null,
      isPublic: true,
      userId,
    })
    .returning({ id: lists.id });

  if (!insertedList.length) {
    throw new Error("Failed to create list.");
  }

  if (insertedList) {
    redirect("/dashboard");
  }

  return { success: true, id: insertedList[0].id };
}

// Get user's lists
export async function getUserLists(userId: string | undefined) {
  if (!userId) return null;
  const userLists = await db
    .select()
    .from(lists)
    .where(eq(lists.userId, userId));

  if (!userLists) return null;

  return userLists;
}

// Get list by ID
export async function getListById(listId: string | undefined) {
  if (!listId) return null;

  try {
    const list = await db
      .select()
      .from(lists)
      .where(eq(lists.id, listId))
      .limit(1);

    if (!list) return null;

    return list[0];
  } catch (error: any) {
    console.log(error.message);
  }
}
