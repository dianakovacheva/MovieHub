import HeaderSection from "./header-section";
import ActorsGallery from "../actors-gallery";

export default function TopCastList({ topCast }) {
  const sectionName: string = "Top Cast";

  return topCast.length > 0 ? (
    <>
      <HeaderSection sectionName={sectionName} data={topCast} />

      <div className="grid xl:grid-cols-3">
        <ActorsGallery actors={topCast} />
      </div>
    </>
  ) : (
    <p> No cast available. </p>
  );
}
