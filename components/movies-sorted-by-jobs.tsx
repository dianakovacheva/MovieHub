import React from "react";
import { PersonMovieCreditsResponse } from "../app/actions/person/types";
import getMoviesByReleaseState from "../app/utils/get-movies-by-release-state";
import Accordion from "./accordion";

type MoviesSortedByJobsProps = {
  moviesSortedByJobs: PersonMovieCreditsResponse["crew"];
};

export default function MoviesSortedByJobs({
  moviesSortedByJobs,
}: MoviesSortedByJobsProps) {
  const jobs = [
    ...new Set(moviesSortedByJobs?.map((movie) => movie.job).filter(Boolean)),
  ];

  return jobs.map((job) => {
    let jobMovies = [];

    jobMovies = moviesSortedByJobs!.filter((movie) => movie.job === job);

    const upcomingMovies = getMoviesByReleaseState(jobMovies, "upcoming");

    const previousMovies = [
      ...getMoviesByReleaseState(jobMovies, "previous"),
      ...jobMovies.filter((movie) => movie.release_date === ""),
    ];

    return (
      <React.Fragment key={job}>
        {job && (
          <h2 className="text-2xl font-medium text-zinc-900 dark:text-white">
            {job}
          </h2>
        )}

        {upcomingMovies.length > 0 && (
          <Accordion movies={upcomingMovies} listTitle={"Upcoming"} />
        )}

        {previousMovies.length > 0 && (
          <Accordion movies={previousMovies} listTitle={"Previous"} />
        )}
      </React.Fragment>
    );
  });
}
