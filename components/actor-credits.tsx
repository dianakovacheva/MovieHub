import { PersonMovieCreditsResponse } from "../app/actions/person/types";
import HeaderSection from "./movie-details/header-section";
import MoviesSortedByJobs from "./movies-sorted-by-jobs";
import MoviesSortedByReleaseYear from "./movies-sorted-by-release-year";

type ActorCreditsProps = {
  moviesSortedByReleaseYear: PersonMovieCreditsResponse["cast"];
  moviesSortedByJobs: PersonMovieCreditsResponse["crew"];
};

export default function ActorCredits({
  moviesSortedByReleaseYear,
  moviesSortedByJobs,
}: ActorCreditsProps) {
  const sectionName: string = "Credits";

  return (
    <>
      <HeaderSection sectionName={sectionName} count={undefined} />
      {moviesSortedByReleaseYear && (
        <MoviesSortedByReleaseYear
          moviesSortedByReleaseYear={moviesSortedByReleaseYear}
        />
      )}

      {moviesSortedByJobs && (
        <MoviesSortedByJobs moviesSortedByJobs={moviesSortedByJobs} />
      )}
    </>
  );
}
