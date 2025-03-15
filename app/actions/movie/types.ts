import { paths } from "../../../types/tmdb";

// Treding movies today
export type TrendingMovieListResponse =
  paths["/3/trending/movie/{time_window}"]["get"]["responses"][200]["content"]["application/json"];

// Movie details
export type MovieDetailsResponse =
  paths["/3/movie/{movie_id}"]["get"]["responses"][200]["content"]["application/json"];

// Movie videos
export type MovieVideosResponse =
  paths["/3/movie/{movie_id}/videos"]["get"]["responses"][200]["content"]["application/json"];

// Movie backdrops
export type MovieImagesResponse =
  paths["/3/movie/{movie_id}/images"]["get"]["responses"][200]["content"]["application/json"];

// Movie credits
export type MovieCreditsResponse =
  paths["/3/movie/{movie_id}/credits"]["get"]["responses"][200]["content"]["application/json"];

// Movie credits details
export type MovieCreditDetailsResponse =
  paths["/3/credit/{credit_id}"]["get"]["responses"][200]["content"]["application/json"];

// Movie suggestions
export type MovieSuggestionsResponse =
  paths["/3/movie/{movie_id}/similar"]["get"]["responses"][200]["content"]["application/json"];

// Movie keywords
export type MovieKeywordsResponse =
  paths["/3/movie/{movie_id}/keywords"]["get"]["responses"][200]["content"]["application/json"];

// Upcoming movies
export type UpcomingMoviesResponse =
  paths["/3/discover/movie"]["get"]["responses"][200]["content"]["application/json"];

// Top rated movies
export type TopRatedMoviesResponse =
  paths["/3/movie/top_rated"]["get"]["responses"][200]["content"]["application/json"];
