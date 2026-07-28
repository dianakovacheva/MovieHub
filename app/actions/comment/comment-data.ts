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
  UserComment,
} from "./definitions";
import { getMovieDetails } from "../movie/movie-data";
import { getSeriesDetails } from "../series/series-data";

const SERIES_PREFIX = "tv-";

function toSlug(title: string) {
  return title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
}

async function resolveMedia(
  movieId: string,
): Promise<Pick<UserComment, "mediaTitle" | "mediaHref" | "mediaType">> {
  if (movieId.startsWith(SERIES_PREFIX)) {
    const seriesId = movieId.slice(SERIES_PREFIX.length);
    const series = await getSeriesDetails(seriesId);
    const title = series?.name ?? `Series ${seriesId}`;
    const slug = series?.name ? `-${toSlug(series.name)}` : "";

    return {
      mediaTitle: title,
      mediaHref: `/tv/${seriesId}${slug}`,
      mediaType: "tv",
    };
  }

  const movie = await getMovieDetails(movieId);
  const title = movie?.title ?? `Movie ${movieId}`;
  const slug = movie?.title ? `-${toSlug(movie.title)}` : "";

  return {
    mediaTitle: title,
    mediaHref: `/movie/${movieId}${slug}`,
    mediaType: "movie",
  };
}

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

// Get all comments left by a user, most recent first, with media titles
export async function getUserComments(userId: string): Promise<UserComment[]> {
  if (!userId) return [];

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
      .where(eq(comments.userId, userId))
      .orderBy(desc(comments.createdAt));

    return await Promise.all(
      rows.map(async (row) => {
        const media = await resolveMedia(row.movieId);
        return { ...row, ...media };
      }),
    );
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
  revalidatePath(`/user/${user.id}`);

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
  revalidatePath(`/user/${user.id}`);

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
