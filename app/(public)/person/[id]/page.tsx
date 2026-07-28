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
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Person Page",
};

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const personId = Number(id.split("-")[0]);
  const personData = await getPersonData(personId);

  if (!personData) {
    notFound();
  }

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

  // Sort cast credits newest → oldest by release date
  const moviesSortedByReleaseYear = [...(moviesActorPlayedIn ?? [])]
    .filter((movie) => movie.release_date)
    .sort((a, b) => (b.release_date ?? "").localeCompare(a.release_date ?? ""));

  // Sort crew credits by job, then newest → oldest within each job
  if (acterAsCrew) {
    moviesSortedByJobs = [...acterAsCrew].sort((a, b) => {
      const jobComparison = (a.job ?? "").localeCompare(b.job ?? "");
      if (jobComparison !== 0) return jobComparison;

      return (b.release_date ?? "").localeCompare(a.release_date ?? "");
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
              alt={personData.name}
              path={personData.profile_path}
              height={personData.profile_path ? 100 : 300}
              width={personData.profile_path ? 400 : 300}
              style={!personData.profile_path ? "shadow-none" : ""}
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
