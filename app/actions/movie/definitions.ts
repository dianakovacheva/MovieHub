import { z } from "zod";

const TrendingMovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  id: z.number(),
  title: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  media_type: z.string(),
  genre_ids: z.array(z.number()),
  popularity: z.number(),
  release_date: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const TrendingMovieListSchema = z.object({
  results: z.array(TrendingMovieSchema),
});

// const MovieSchema = z.object({
//   adult: z.boolean(),
//   backdrop_path: z.string(),
//   belongs_to_collection:
//     z.object({
//       id: z.number(),
//       name: z.string(),
//       poster_path: z.string(),
//       backdrop_path: z.string(),
//     }) || null,
//   budget: z.number(),
//   genres: z.array(z.object({ id: z.number(), name: z.string() })),
//   homepage: z.string(),
//   id: z.number(),
//   imdb_id: z.string(),
//   origin_country: z.array(z.object({})),
//   original_language: z.string(),
//   original_title: z.string(),
//   overview: z.string(),
//   popularity: z.number(),
//   poster_path: z.string(),
//   production_companies: z.array(
//     z.object({
//       id: z.number(),
//       logo_path: z.string() || null,
//       name: z.string(),
//       origin_country: z.string(),
//     })
//   ),
//   production_countries: z.array(
//     z.object({
//       iso_3166_1: z.string(),
//       name: z.string(),
//     })
//   ),
//   release_date: z.string(),
//   revenue: z.number(),
//   runtime: z.number(),
//   spoken_languages: z.array(
//     z.object({
//       english_name: z.string(),
//       iso_639_1: z.string(),
//       name: z.string(),
//     })
//   ),
//   status: z.string(),
//   tagline: z.string(),
//   title: z.string(),
//   video: z.boolean(),
//   vote_average: z.number(),
//   vote_count: z.number(),
// });

export type MoviesProps = {
  movies: {
    adult: boolean;
    backdrop_path?: string;
    genre_ids?: number[];
    id: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity: number;
    poster_path?: string;
    release_date?: string;
    title?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    character?: string;
    credit_id?: string;
    order?: number;
    media_type?: string;
  }[];
};

// Upcoming movies trailers
export type UpcomingMoviesTrailersProps = {
  iso_639_1?: string;
  iso_3166_1?: string;
  name?: string;
  key?: string;
  site?: string;
  size: number;
  type?: string;
  official: boolean;
  published_at?: string;
  id?: string;
  movie_title?: string | undefined;
  movie_id?: string | undefined;
}[];
