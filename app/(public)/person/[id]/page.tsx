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

export default async function PersonPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const personId = Number(id.split("-")[0]);
  const personData = await getPersonData(personId);

  const yearOfBirth = personData?.birthday?.split("-")[0] ?? "";
  const yearOfDeath =
    typeof personData?.deathday === "string"
      ? personData.deathday.split("-")[0]
      : "";

  let personImages = await getPersonImages(personId);
  const personMovieCredits = await getPersonMovieCredits(personId);
  const moviesActorPlayedIn = personMovieCredits!.cast;
  const acterAsCrew = personMovieCredits!.crew;
  let moviesSortedByJobs: typeof acterAsCrew = [];
  const title = personData?.name ?? "Unknown";
  const subtitleData = personData?.known_for_department
    ? `Known For ${personData.known_for_department}`
    : "Known For N/A";

  // Sort movies by release year
  const moviesSortedByReleaseYear = moviesActorPlayedIn!
    .filter((movie) => movie.release_date)
    .sort(
      (a, b) =>
        new Date(Number(b.release_date)).getFullYear() -
        new Date(Number(a.release_date)).getFullYear()
    );

  // Sort movies by job and relese year
  if (acterAsCrew) {
    moviesSortedByJobs = acterAsCrew.sort((a, b) => {
      // First, sort by job alphabetically
      const jobComparison = a.job!.localeCompare(b.job!);
      if (jobComparison !== 0) return jobComparison; // If jobs are different, sort by job

      // If jobs are the same, sort by release year (descending)
      return (
        new Date(Number(b.release_date)).getFullYear() -
        new Date(Number(a.release_date)).getFullYear()
      );
    });
  }

  const titleData = (
    <div className="flex flex-col items-start md:flex-row md:items-end gap-2">
      <span>{title}</span>
      {yearOfBirth && typeof yearOfDeath === "string" && (
        <h2 className="text-3xl text-zinc-500 dark:text-[#c0bcbc] font-medium">
          ({yearOfBirth} - {yearOfDeath})
        </h2>
      )}
    </div>
  );

  personImages =
    personImages?.map((image) => ({
      ...image,
      name: personData?.name,
    })) ?? [];

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
          {personData.biography && (
            <ActorBiography biography={personData.biography} />
          )}
        </div>
      )}

      {/* Actor Information Block*/}
      {personData && <ActorInformationBlock personData={personData} />}

      {/* Actor Image Gallery */}
      {personImages && (
        <div>
          <ImageGallery backdrops={personImages} />
        </div>
      )}

      {/* Known for */}
      {moviesActorPlayedIn && <ActorKnownFor movies={moviesActorPlayedIn} />}

      {/* Actor Credits */}

      <ActorCredits
        moviesSortedByReleaseYear={moviesSortedByReleaseYear ?? []}
        moviesSortedByJobs={moviesSortedByJobs ?? []}
      />
    </div>
  );
}
