import Accordion from "./accordion";

export default function MoviesBySortedJobs({ moviesBySortedJobsAndYear }) {
  let jobs: string[] = [];
  const today = new Date();

  moviesBySortedJobsAndYear.map((movie) => {
    jobs.push(movie.job);
  });

  // // Filter jobs
  jobs = jobs.filter((value, index, array) => array.indexOf(value) === index);

  return jobs.map((job) => {
    let jobMovies = [];
    let upcomingMovies = [];
    let previousMovies = [];

    jobMovies = moviesBySortedJobsAndYear.filter((movie) => movie.job == job);

    // Upcoming Movies
    upcomingMovies = jobMovies
      .filter((movie) => movie.release_date !== "")
      .filter((movie) => new Date(movie.release_date) > today);

    // Previous Movies
    previousMovies = jobMovies.filter(
      (movie) => new Date(movie.release_date) <= today
    );

    // Get movies with empy release_date
    const moviesWithEmptyReleaseDate = jobMovies.filter(
      (movie) => movie.release_date == ""
    );

    // Add movies with empy release_date to previousMovies
    moviesWithEmptyReleaseDate.map((movie) => {
      previousMovies.push(movie);
    });

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

        {upcomingMovies.length > 0 ? (
          <Accordion movies={jobMovies} listTitle={"Upcoming"} />
        ) : (
          ""
        )}

        {previousMovies.length > 0 ? (
          <Accordion movies={jobMovies} listTitle={"Previous"} />
        ) : (
          ""
        )}
      </>
    );
  });
}
