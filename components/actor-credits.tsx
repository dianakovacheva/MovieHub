import HeaderSection from "./movie-details/header-section";
import MoviesBySortedJobs from "./movies-by-sorted-jobs";
import MoviesSortedByReleaseYear from "./movies-sorted-by-release-year";

export default function ActorCredits({
  moviesSortedByReleaseYear,
  moviesSortedByJobsAndYear,
}) {
  const sectionName: string = "Credits";

  return (
    <>
      <HeaderSection sectionName={sectionName} count={undefined} />
      <MoviesSortedByReleaseYear
        moviesSortedByReleaseYear={moviesSortedByReleaseYear}
      />
      <MoviesBySortedJobs
        moviesSortedByJobsAndYear={moviesSortedByJobsAndYear}
      />
    </>
  );
}
