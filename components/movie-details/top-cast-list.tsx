import HeaderSection from "./header-section";
import ActorsGallery from "../actors-gallery";

export default function TopCastList({ topCast }) {
  const sectionName: string = "Top Cast";
  console.log(topCast);

  return (
    <>
      {topCast.length > 0 ? (
        <HeaderSection sectionName={sectionName} data={topCast} />
      ) : (
        <HeaderSection sectionName={sectionName} data={undefined} />
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
