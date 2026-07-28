"use server";

import { and, desc, eq } from "drizzle-orm";
import { db } from "../../db";
import { watchlist } from "../../db/schema";
import { revalidatePath } from "next/cache";
import { getUserSession } from "../user/user-data";
import { getMovieDetails } from "../movie/movie-data";
import { MoviesProps } from "../movie/definitions";
import { getSeriesDetails } from "../series/series-data";
import { SeriesProps } from "../series/definitions";

// Series watchlist entries are stored with a "tv-" prefixed id in the shared
// `movieId` column so movies and series can coexist without a schema change.
const SERIES_PREFIX = "tv-";

// Get the current user's watchlist (most recently added first)
export async function getWatchlist() {
  const user = await getUserSession();

  if (!user) return null;

  try {
    return await db
      .select()
      .from(watchlist)
      .where(eq(watchlist.userId, user.id))
      .orderBy(desc(watchlist.addedAt));
  } catch (error) {
    console.log((error as Error).message);
    return null;
  }
}

// Resolve the current user's movie watchlist into full TMDB movie objects
export async function getWatchlistMovies(): Promise<MoviesProps["movies"]> {
  const entries = await getWatchlist();

  if (!entries || entries.length === 0) return [];

  const movieEntries = entries.filter(
    (entry) => !entry.movieId.startsWith(SERIES_PREFIX),
  );

  const movies = await Promise.all(
    movieEntries.map(async (entry) => {
      const movie = await getMovieDetails(entry.movieId);

      if (!movie || !movie.id) return null;

      return {
        adult: movie.adult ?? false,
        backdrop_path: movie.backdrop_path ?? undefined,
        id: movie.id,
        original_language: movie.original_language ?? undefined,
        original_title: movie.original_title ?? undefined,
        overview: movie.overview ?? undefined,
        popularity: movie.popularity ?? 0,
        poster_path: movie.poster_path ?? undefined,
        release_date: movie.release_date ?? undefined,
        title: movie.title ?? undefined,
        video: movie.video ?? false,
        vote_average: movie.vote_average ?? 0,
        vote_count: movie.vote_count ?? 0,
      };
    }),
  );

  return movies.filter(
    (movie): movie is NonNullable<typeof movie> => movie !== null,
  );
}

// Resolve the current user's series watchlist into TMDB series objects
export async function getWatchlistSeries(): Promise<SeriesProps["series"]> {
  const entries = await getWatchlist();

  if (!entries || entries.length === 0) return [];

  const seriesEntries = entries.filter((entry) =>
    entry.movieId.startsWith(SERIES_PREFIX),
  );

  const series = await Promise.all(
    seriesEntries.map(async (entry) => {
      const seriesId = entry.movieId.slice(SERIES_PREFIX.length);
      const show = await getSeriesDetails(seriesId);

      if (!show || !show.id) return null;

      return {
        id: show.id,
        name: show.name ?? undefined,
        original_name: show.original_name ?? undefined,
        overview: show.overview ?? undefined,
        poster_path: show.poster_path ?? undefined,
        backdrop_path: show.backdrop_path ?? undefined,
        first_air_date: show.first_air_date ?? undefined,
        vote_average: show.vote_average ?? undefined,
        popularity: show.popularity ?? undefined,
      };
    }),
  );

  return series.filter(
    (show): show is NonNullable<typeof show> => show !== null,
  );
}

// Check whether a given item is already in the current user's watchlist
export async function isInWatchlist(movieId: string) {
  const user = await getUserSession();

  if (!user) return false;

  try {
    const existing = await db
      .select()
      .from(watchlist)
      .where(and(eq(watchlist.userId, user.id), eq(watchlist.movieId, movieId)))
      .limit(1);

    return existing.length > 0;
  } catch (error) {
    console.log((error as Error).message);
    return false;
  }
}

// Add a movie to the current user's watchlist
export async function addToWatchlist(movieId: string) {
  const user = await getUserSession();

  if (!user) {
    return { errors: { auth: ["You must be logged in."] } };
  }

  const existing = await db
    .select()
    .from(watchlist)
    .where(and(eq(watchlist.userId, user.id), eq(watchlist.movieId, movieId)))
    .limit(1);

  if (existing.length > 0) {
    return { success: true, alreadyAdded: true };
  }

  await db.insert(watchlist).values({ userId: user.id, movieId });

  revalidatePath("/watchlist");

  return { success: true };
}

// Remove a movie from the current user's watchlist
export async function removeFromWatchlist(movieId: string) {
  const user = await getUserSession();

  if (!user) {
    return { errors: { auth: ["You must be logged in."] } };
  }

  await db
    .delete(watchlist)
    .where(and(eq(watchlist.userId, user.id), eq(watchlist.movieId, movieId)));

  revalidatePath("/watchlist");

  return { success: true };
}

// Toggle a movie in/out of the watchlist. Returns the resulting state.
export async function toggleWatchlist(movieId: string) {
  const user = await getUserSession();

  if (!user) {
    return { errors: { auth: ["You must be logged in."] } };
  }

  try {
    const existing = await db
      .select()
      .from(watchlist)
      .where(and(eq(watchlist.userId, user.id), eq(watchlist.movieId, movieId)))
      .limit(1);

    if (existing.length > 0) {
      await db
        .delete(watchlist)
        .where(
          and(eq(watchlist.userId, user.id), eq(watchlist.movieId, movieId)),
        );

      revalidatePath("/watchlist");

      return { success: true, inWatchlist: false };
    }

    await db.insert(watchlist).values({ userId: user.id, movieId });

    revalidatePath("/watchlist");

    return { success: true, inWatchlist: true };
  } catch (error) {
    console.log((error as Error).message);
    return { errors: { db: ["Could not update your watchlist."] } };
  }
}
