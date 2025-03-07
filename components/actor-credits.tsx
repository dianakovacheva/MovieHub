import HeaderSection from "./movie-details/header-section";
import MoviesBySortedJobs from "./movies-by-sorted-jobs";
import MoviesSortedByReleaseYear from "./movies-sorted-by-release-year";

export default function ActorCredits({
  moviesSortedByReleaseYear,
  moviesBySortedJobsAndYear,
}) {
  const sectionName: string = "Credits";

  return (
    <>
      <HeaderSection sectionName={sectionName} data={undefined} />
      <MoviesSortedByReleaseYear
        moviesSortedByReleaseYear={moviesSortedByReleaseYear}
      />
      <MoviesBySortedJobs
        moviesBySortedJobsAndYear={moviesBySortedJobsAndYear}
      />
    </>
  );
}
