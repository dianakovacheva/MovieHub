import getMoviesByReleaseState from "../app/utils/get-movies-by-release-state";
import Accordion from "./accordion";

export default function MoviesBySortedJobs({ moviesBySortedJobsAndYear }) {
  let jobs: string[] = [];

  moviesBySortedJobsAndYear.map((movie) => {
    jobs.push(movie.job);
  });

  // // Filter jobs
  jobs = jobs.filter((value, index, array) => array.indexOf(value) === index);

  return jobs.map((job) => {
    let jobMovies = [];

    jobMovies = moviesBySortedJobsAndYear.filter((movie) => movie.job == job);

    const upcomingMovies = getMoviesByReleaseState(jobMovies, "upcoming");

    let previousMovies = getMoviesByReleaseState(jobMovies, "previous");

    // Get movies with empty release_date and merge with previousMovies
    const moviesWithEmptyReleaseDate = jobMovies.filter(
      (movie) => movie.release_date === ""
    );

    previousMovies = previousMovies.concat(moviesWithEmptyReleaseDate);

    return (
      <>
        {upcomingMovies.length > 0 || previousMovies.length > 0 ? (
          <h2
            key={job}
            className="text-2xl font-medium text-zinc-900 dark:text-white"
          >
            {job}
          </h2>
        ) : (
          ""
        )}

        {upcomingMovies.length > 0 && (
          <Accordion movies={upcomingMovies} listTitle={"Upcoming"} />
        )}

        {previousMovies.length > 0 && (
          <Accordion movies={previousMovies} listTitle={"Previous"} />
        )}
      </>
    );
  });
}
