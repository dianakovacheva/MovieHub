import getMoviesByReleaseState from "../app/utils/get-movies-by-release-state";
import Accordion from "./accordion";

export default function MoviesSortedByReleaseYear({
  moviesSortedByReleaseYear,
}) {
  const upcomingMovies = getMoviesByReleaseState(
    moviesSortedByReleaseYear,
    "upcoming"
  );

  let previousMovies = getMoviesByReleaseState(
    moviesSortedByReleaseYear,
    "previous"
  );

  // Get movies with empty release_date and merge with previousMovies
  const moviesWithEmptyReleaseDate = moviesSortedByReleaseYear.filter(
    (movie) => movie.release_date === ""
  );

  previousMovies = previousMovies.concat(moviesWithEmptyReleaseDate);

  return (
    <>
      <h2 className="text-2xl font-medium text-zinc-900 dark:text-white">
        Actor
      </h2>
      {upcomingMovies.length > 0 ? (
        <Accordion movies={upcomingMovies} listTitle={"Upcoming"} />
      ) : (
        ""
      )}

      {previousMovies.length > 0 ? (
        <Accordion movies={previousMovies} listTitle={"Previous"} />
      ) : (
        ""
      )}
    </>
  );
}
