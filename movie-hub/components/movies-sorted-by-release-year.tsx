import Accordion from "./accordion";

export default function MoviesSortedByReleaseYear({
  moviesSortedByReleaseYear,
}) {
  const today = new Date();
  let upcomingMovies = [];
  let previousMovies = [];

  upcomingMovies = moviesSortedByReleaseYear.filter(
    (movie) => new Date(movie.release_date) > today
  );

  previousMovies = moviesSortedByReleaseYear.filter(
    (movie) => new Date(movie.release_date) <= today
  );

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
