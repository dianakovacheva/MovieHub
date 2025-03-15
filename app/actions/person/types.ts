import { paths } from "../../../types/tmdb";

// Person data
export type PersonDataResponse =
  paths["/3/person/{person_id}"]["get"]["responses"][200]["content"]["application/json"];

// Person images
export type PersonImagesResponse =
  paths["/3/person/{person_id}/images"]["get"]["responses"][200]["content"]["application/json"];

// Person movie credis
export type PersonMovieCreditsResponse =
  paths["/3/person/{person_id}/movie_credits"]["get"]["responses"][200]["content"]["application/json"];

// Most popular people
export type MostPopularPeopleResponse =
  paths["/3/person/popular"]["get"]["responses"][200]["content"]["application/json"];
