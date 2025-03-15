import HeaderSection from "./header-section";
import ActorsGallery from "../actors-gallery";

export default function TopCastList({ topCast }) {
  const sectionName: string = "Top Cast";
  const topCastCount: number = topCast.length;

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
