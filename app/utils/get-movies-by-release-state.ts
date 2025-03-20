import { MoviesProps } from "../actions/movie/definitions";
import compareDates from "./compare-dates";

export default function getMoviesByReleaseState(
  data: MoviesProps["movies"],
  releaseState: "upcoming" | "previous" = "upcoming"
) {
  const moviesState = data
    .filter(
      (movie) =>
        typeof movie.release_date === "string" &&
        compareDates(movie.release_date) === releaseState
    )
    .filter((movie) => movie.release_date !== "");

  return moviesState;
}
