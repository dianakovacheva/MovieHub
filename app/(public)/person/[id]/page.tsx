import { Metadata } from "next";
import {
  getPersonData,
  getPersonImages,
  getPersonMovieCredits,
} from "../../../actions/person/person-data";
import Poster from "../../../../components/poster";
import ActorBiography from "../../../../components/actor-biography";
import ActorInformationBlock from "../../../../components/actor-information-block";
import ImageGallery from "../../../../components/image-gallery";
import ActorKnownFor from "../../../../components/actor-known-for";
import ActorCredits from "../../../../components/actor-credits";
import PageTitleSubtitle from "../../../../components/page-title-subtitle";

export const metadata: Metadata = {
  title: "Person Page",
};

// interface PersonPageProps {
//   params: { id: string };
// }

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const personId: number = Number(id.split("-")[0]);
  const personData = await getPersonData(personId);
  let yearOfBirth: string | undefined;
  let yearOfDeat: string | undefined;
  let personImages = await getPersonImages(personId);
  const personMovieCredits = await getPersonMovieCredits(personId);
  const moviesActorPlayedIn = personMovieCredits!.cast;
  const acterAsCrew = personMovieCredits!.crew;
  let moviesSortedByReleaseYear: typeof moviesActorPlayedIn;
  let moviesBySortedJobs: typeof acterAsCrew;
  let moviesSortedByJobsAndYear: typeof acterAsCrew;
  const title = personData!.name;
  const subtitleData = `Known For ${personData!.known_for_department}`;

  // Sort cast movies by release year
  if (moviesActorPlayedIn) {
    moviesSortedByReleaseYear = moviesActorPlayedIn.sort(
      (a, b) =>
        new Date(Number(b.release_date)).getFullYear() -
        new Date(Number(a.release_date)).getFullYear()
    );
  }

  // Sort crew movies by job and relese year
  if (acterAsCrew) {
    moviesBySortedJobs = acterAsCrew.sort((a, b) =>
      a.job!.localeCompare(b.job!)
    );
  }

  if (moviesBySortedJobs) {
    moviesSortedByJobsAndYear = moviesBySortedJobs.sort(
      (a, b) =>
        new Date(Number(b.release_date)).getFullYear() -
        new Date(Number(a.release_date)).getFullYear()
    );
  }

  if (personData && personData.deathday) {
    yearOfDeat = personData.deathday.toString().split("-")[0];
  }

  if (personData && personData.birthday) {
    yearOfBirth = personData.birthday.split("-")[0];
  }

  const titleData = (
    <div className="flex flex-col items-start md:flex-row md:items-end gap-2">
      <span>{title}</span>
      <h2 className="text-3xl text-zinc-500 dark:text-[#c0bcbc] font-medium">
        ({yearOfBirth} - {yearOfDeat})
      </h2>
    </div>
  );

  if (personImages && personData) {
    personImages = personImages.map((image) => ({
      ...image,
      name: personData.name,
    }));
  }

  return (
    <div className="flex flex-col gap-4 mb-10">
      {/* Header Section */}
      {personData && personData.deathday ? (
        <PageTitleSubtitle title={titleData} subtitle={subtitleData} />
      ) : (
        <PageTitleSubtitle title={title} subtitle={subtitleData} />
      )}

      {/* Actor Image and Biography */}
      {personData && (
        <div className="flex flex-col md:flex-row gap-6 mb-2">
          <div className="flex flex-col md:w-[25vw]">
            <Poster
              name={personData.name}
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
      )}

      {/* Actor Information Block*/}
      {personData && <ActorInformationBlock actorData={personData} />}

      {/* Actor Image Gallery */}
      {personImages && (
        <div>
          <ImageGallery backdrops={personImages} />
        </div>
      )}

      {/* Known for */}
      {moviesActorPlayedIn && <ActorKnownFor movies={moviesActorPlayedIn} />}

      {/* Actor Credits */}
      {moviesSortedByReleaseYear && moviesSortedByJobsAndYear && (
        <ActorCredits
          moviesSortedByReleaseYear={moviesSortedByReleaseYear}
          moviesSortedByJobsAndYear={moviesSortedByJobsAndYear}
        />
      )}
    </div>
  );
}
