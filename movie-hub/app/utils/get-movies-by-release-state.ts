import compareDates from "./compare-dates";

export default function getMoviesByReleaseState(
  data,
  releaseState: "upcoming" | "previous" = "upcoming"
) {
  const today = new Date().toISOString().split("T")[0];

  const moviesState = data
    .filter((movie) => compareDates(movie.release_date, today) === releaseState)
    .filter((movie) => movie.release_date !== "");

  return moviesState;
}
