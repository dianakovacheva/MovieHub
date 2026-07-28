"use server";

import { listMovies, lists } from "./../../db/schema";
import { db } from "../../db";
import { CreateListFormSchema, CreateListFormState, UpdateListNameSchema, UpdateListNameState } from "./definitions";
import { and, count, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Metadata } from "next";

// Generate meta data
export async function generateListMetadata(id: string): Promise<Metadata> {
  const list = await getListById(id);
  return {
    title: list?.name,
  };
}

// Create list
export async function createList(
  formData: FormData,
  userId: string,
): Promise<CreateListFormState> {
  // 1. Validate form fields
  const validatedFields = CreateListFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    isPublic: formData.get("isPublic"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, description, isPublic } = validatedFields.data;

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
      isPublic,
      userId,
    })
    .returning({ id: lists.id });

  if (!insertedList.length) {
    throw new Error("Failed to create list.");
  }

  if (insertedList && insertedList[0] !== undefined) {
    revalidatePath(`/list`);
    redirect(`/list/${insertedList[0].id}`);
  }

  return insertedList[0] && { success: true, id: insertedList[0].id };
}

// Update list name
export async function updateListName(
  listId: string,
  userId: string,
  name: string,
): Promise<UpdateListNameState> {
  if (!listId || !userId) {
    return { errors: { name: ["Missing list or user id."] } };
  }

  const validatedFields = UpdateListNameSchema.safeParse({ name });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const list = await getListById(listId);

  if (!list) {
    return { errors: { name: ["List not found."] } };
  }

  if (list.userId !== userId) {
    return { errors: { name: ["You can only edit your own lists."] } };
  }

  const { name: validatedName } = validatedFields.data;

  const existingList = await db
    .select()
    .from(lists)
    .where(and(eq(lists.name, validatedName)))
    .limit(1);

  if (existingList.length > 0 && existingList[0]?.id !== listId) {
    return { errors: { name: ["List already exists."] } };
  }

  await db
    .update(lists)
    .set({ name: validatedName, updatedAt: new Date() })
    .where(eq(lists.id, listId));

  revalidatePath(`/list/${listId}`);

  return { success: true };
}

// Get user's lists
export async function getUserLists(userId: string) {
  if (!userId) return null;

  const userLists = await db
    .select({
      id: lists.id,
      name: lists.name,
      description: lists.description,
      isPublic: lists.isPublic,
      createdAt: lists.createdAt,
      updatedAt: lists.updatedAt,
      userId: lists.userId,
      itemCount: count(listMovies.movieId),
    })
    .from(lists)
    .leftJoin(listMovies, eq(lists.id, listMovies.listId))
    .where(eq(lists.userId, userId))
    .groupBy(lists.id);

  if (!userLists) return null;

  return userLists;
}

// Get list by ID
export async function getListById(listId: string) {
  if (!listId) return null;

  try {
    const list = await db
      .select()
      .from(lists)
      .where(eq(lists.id, listId))
      .limit(1);

    if (!list) return null;

    return list[0];
  } catch (error) {
    console.log((error as Error).message);
  }
}

// Add movie to list
export async function addMovieToList(
  listId: string,
  movieId: string,
  userId: string,
) {
  // 1. Check if movie already added to the list
  const existingMovie = await db
    .select()
    .from(listMovies)
    .where(and(eq(listMovies.listId, listId), eq(listMovies.movieId, movieId)))
    .limit(1);

  if (existingMovie.length > 0) {
    return { errors: { name: ["Movie already added to the list."] } };
  }

  // 2. Insert movie into the list database
  const insertedMovie = await db
    .insert(listMovies)
    .values({ listId, movieId, userId })
    .returning({ listId: listMovies.listId });

  if (!insertedMovie.length || !insertedMovie[0]) {
    throw new Error("Failed to insert movie to DB.");
  }

  // Refresh the list page in place so the new movie shows without a full redirect
  revalidatePath(`/list/${listId}`);

  return { success: true, id: insertedMovie[0].listId };
}

// Remove movie from list
export async function removeMovieFromList(listId: string, movieId: string) {
  if (!listId || !movieId) {
    return { errors: { name: ["Missing list or movie id."] } };
  }

  await db
    .delete(listMovies)
    .where(and(eq(listMovies.listId, listId), eq(listMovies.movieId, movieId)));

  revalidatePath(`/list/${listId}`);

  return { success: true };
}

// Get list's movies
export async function getListMovies(listId: string) {
  if (!listId) return null;

  try {
    const listMoviesArr = await db
      .select()
      .from(listMovies)
      .where(eq(listMovies.listId, listId));

    if (!listMoviesArr) return null;

    return listMoviesArr;
  } catch (error) {
    console.log((error as Error).message);
  }
}

// Delete list
export async function deleteList(listId: string) {
  if (!listId) return null;

  await db.delete(lists).where(eq(lists.id, listId));
  revalidatePath("/lists");
}
