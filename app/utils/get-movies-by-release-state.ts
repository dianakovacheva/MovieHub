import compareDates from "./compare-dates";
import convertDateToString from "./convert-date-to-string";

export default function getMoviesByReleaseState(
  data,
  releaseState: "upcoming" | "previous" = "upcoming"
) {
  const today = new Date();
  const dateToString = convertDateToString(today);

  const moviesState = data
    .filter(
      (movie) => compareDates(movie.release_date, dateToString) === releaseState
    )
    .filter((movie) => movie.release_date !== "");

  return moviesState;
}
