import HeaderSection from "./header-section";
import ActorsGallery from "../actors-gallery";

type TopCastListProps = {
  topCast: {
    adult: boolean;
    gender: number;
    id: number;
    known_for?: {
      adult: boolean;
      backdrop_path?: string;
      genre_ids?: number[];
      id: number;
      media_type?: string;
      original_language?: string;
      original_title?: string;
      overview?: string;
      poster_path?: string;
      release_date?: string;
      title?: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }[];
    known_for_department?: string;
    name?: string;
    popularity: number;
    profile_path?: string;
    character?: string;
  }[];
};

export default function TopCastList({ topCast }: TopCastListProps) {
  const sectionName: string = "Top Cast";
  let topCastCount: number = 0;

  if (topCast && topCast.length > 0) {
    topCastCount = topCast.length;
  }

  return (
    <>
      {topCast.length > 0 ? (
        <HeaderSection sectionName={sectionName} count={topCastCount} />
      ) : (
        <HeaderSection sectionName={sectionName} count={undefined} />
      )}

      {topCast && topCast.length > 0 ? (
        <div className="grid xl:grid-cols-3">
          <ActorsGallery actors={topCast} />
        </div>
      ) : (
        <p> No cast available. </p>
      )}
    </>
  );
}
