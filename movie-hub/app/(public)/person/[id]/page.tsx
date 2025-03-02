import { Metadata } from "next";
import Title from "../../../../components/movie-details/title";
import {
  getPersonDetails,
  getPersonImages,
  getPersonMovieCredits,
} from "../../../actions/person/person-data";
import Subtitle from "../../../../components/subtitle";
import Poster from "../../../../components/poster";
import ActorBiography from "../../../../components/actor-biography";
import ActorInformationBlock from "../../../../components/actor-information-block";
import ImageGallery from "../../../../components/movie-details/image-gallery";
import ActorKnownFor from "../../../../components/actor-known-for";
import ActorCredits from "../../../../components/actor-credits";

export const metadata: Metadata = {
  title: "Person Page",
};

export default async function PersonPage({ params }) {
  const { id } = await params;
  const personId: number = id.split("-")[0];
  const personData = await getPersonDetails(personId);
  let yearOfBirth = "";
  let yearOfDeat = "";
  const personImages = await getPersonImages(personId);
  const personMovieCredits = await getPersonMovieCredits(personId);
  const moviesActorPlayedIn = personMovieCredits.cast;
  const acterAsCrew = personMovieCredits.crew;

  // Sort cast movies by release year
  const moviesSortedByReleaseYear = moviesActorPlayedIn.sort(
    (a, b) =>
      new Date(b.release_date).getFullYear() -
      new Date(a.release_date).getFullYear()
  );

  // Sort crew movies by job and relese year
  const moviesBySortedJobs = acterAsCrew.sort((a, b) =>
    a.job.localeCompare(b.job)
  );

  const moviesBySortedJobsAndYear = moviesBySortedJobs.sort(
    (a, b) =>
      new Date(b.release_date).getFullYear() -
      new Date(a.release_date).getFullYear()
  );

  if (personData.deathday) {
    yearOfDeat = personData?.deathday.split("-")[0];
  }

  if (personData.birthday) {
    yearOfBirth = personData.birthday.split("-")[0];
  }

  return (
    <div className="flex flex-col gap-4 mb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-2 md:gap-0">
        {personData.deathday ? (
          <div className="flex flex-col items-start md:flex-row md:items-end gap-2">
            <Title name={personData.name} />
            <h2 className="text-3xl text-zinc-500 dark:text-[#c0bcbc] font-medium">
              ({yearOfBirth} - {yearOfDeat})
            </h2>
          </div>
        ) : (
          <Title name={personData.name} />
        )}
        <Subtitle data={personData.known_for_department} />
      </div>
      {/* Actor Image and Biography */}
      <div className="flex flex-col md:flex-row gap-6 mb-2">
        <div className="flex flex-col md:w-[25vw]">
          <Poster
            data={personData}
            path={personData.profile_path}
            height={personData.profile_path ? 100 : 300}
            width={personData.profile_path ? 400 : 300}
            className={!personData.profile_path ? "shadow-none" : ""}
            isMovie={false}
          />
        </div>
        {/* Biography*/}
        <ActorBiography biography={personData.biography} />
      </div>

      {/* Actor Information Block*/}
      <ActorInformationBlock actorData={personData} />

      {/* Actor Image Gallery */}
      <div>
        <ImageGallery backdrops={personImages.profiles} />
      </div>

      {/* Known for */}
      <ActorKnownFor movies={moviesActorPlayedIn} />

      {/* Actor Credits */}
      <ActorCredits
        moviesSortedByReleaseYear={moviesSortedByReleaseYear}
        moviesBySortedJobsAndYear={moviesBySortedJobsAndYear}
      />
    </div>
  );
}
