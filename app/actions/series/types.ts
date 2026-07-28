import { paths } from "../../../types/tmdb";

// Trending series for a given time window (day/week)
export type TrendingSeriesListResponse =
  paths["/3/trending/tv/{time_window}"]["get"]["responses"][200]["content"]["application/json"];

// Series details
export type SeriesDetailsResponse =
  paths["/3/tv/{series_id}"]["get"]["responses"][200]["content"]["application/json"];

// Series videos
export type SeriesVideosResponse =
  paths["/3/tv/{series_id}/videos"]["get"]["responses"][200]["content"]["application/json"];

// Series backdrops / images
export type SeriesImagesResponse =
  paths["/3/tv/{series_id}/images"]["get"]["responses"][200]["content"]["application/json"];

// Series credits
export type SeriesCreditsResponse =
  paths["/3/tv/{series_id}/credits"]["get"]["responses"][200]["content"]["application/json"];

// Series suggestions (similar shows)
export type SeriesSuggestionsResponse =
  paths["/3/tv/{series_id}/similar"]["get"]["responses"][200]["content"]["application/json"];

// Series recommendations
export type SeriesRecommendationsResponse =
  paths["/3/tv/{series_id}/recommendations"]["get"]["responses"][200]["content"]["application/json"];

// Series keywords (note: TV keywords are under `results`, unlike movies)
export type SeriesKeywordsResponse =
  paths["/3/tv/{series_id}/keywords"]["get"]["responses"][200]["content"]["application/json"];

// Discover series (used for e.g. by-year / genre listings)
export type DiscoverSeriesResponse =
  paths["/3/discover/tv"]["get"]["responses"][200]["content"]["application/json"];

// Top rated series
export type TopRatedSeriesResponse =
  paths["/3/tv/top_rated"]["get"]["responses"][200]["content"]["application/json"];

// Popular series
export type PopularSeriesResponse =
  paths["/3/tv/popular"]["get"]["responses"][200]["content"]["application/json"];

// Series airing today
export type AiringTodaySeriesResponse =
  paths["/3/tv/airing_today"]["get"]["responses"][200]["content"]["application/json"];

// Series currently on the air
export type OnTheAirSeriesResponse =
  paths["/3/tv/on_the_air"]["get"]["responses"][200]["content"]["application/json"];
