import { paths } from "../../../types/tmdb";

export type SearchResponse =
  paths["/3/search/multi"]["get"]["responses"][200]["content"]["application/json"];

export type SearchMovieResponse =
  paths["/3/search/movie"]["get"]["responses"][200]["content"]["application/json"];

export type SearchPersonResponse =
  paths["/3/search/person"]["get"]["responses"][200]["content"]["application/json"];
