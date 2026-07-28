"use server";

import { and, desc, eq } from "drizzle-orm";
import { db } from "../../db";
import { comments, users } from "../../db/schema";
import { revalidatePath } from "next/cache";
import { getUserSession } from "../user/user-data";
import {
  CommentFormSchema,
  CommentFormState,
  CommentWithAuthor,
} from "./definitions";

// Get all comments for a movie, most recent first, including author info
export async function getComments(
  movieId: string,
): Promise<CommentWithAuthor[]> {
  if (!movieId) return [];

  try {
    const rows = await db
      .select({
        id: comments.id,
        movieId: comments.movieId,
        userId: comments.userId,
        content: comments.content,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        authorName: users.name,
        authorEmail: users.email,
      })
      .from(comments)
      .leftJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.movieId, movieId))
      .orderBy(desc(comments.createdAt));

    return rows;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  }
}

// Add a comment to a movie as the current user
export async function addComment(
  movieId: string,
  _prevState: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const user = await getUserSession();

  if (!user) {
    return { errors: { auth: ["You must be logged in to comment."] } };
  }

  const validatedFields = CommentFormSchema.safeParse({
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  await db.insert(comments).values({
    movieId,
    userId: user.id,
    content: validatedFields.data.content,
  });

  revalidateMediaPage(movieId);

  return { success: true };
}

// Delete a comment (only the author may delete it)
export async function deleteComment(commentId: string, movieId: string) {
  const user = await getUserSession();

  if (!user) {
    return { errors: { auth: ["You must be logged in."] } };
  }

  await db
    .delete(comments)
    .where(and(eq(comments.id, commentId), eq(comments.userId, user.id)));

  revalidateMediaPage(movieId);

  return { success: true };
}

// Revalidate the correct detail route. Series comments use a "tv-" prefixed
// id, everything else is treated as a movie. Revalidating the dynamic route
// pattern refreshes the page regardless of the URL slug.
function revalidateMediaPage(mediaId: string) {
  if (mediaId.startsWith("tv-")) {
    revalidatePath("/tv/[id]", "page");
  } else {
    revalidatePath("/movie/[id]", "page");
  }
}
