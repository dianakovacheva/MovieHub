import { getMostPopularPeople } from "../app/actions/person/person-data";
import ActorsGallery from "./actors-gallery";
import HeaderSection from "./movie-details/header-section";

export default async function MostPopularCelebrities() {
  const mostPopularActors = await getMostPopularPeople();
  const sectionName = "Most popular celebrities";

  return (
    <>
      <HeaderSection sectionName={sectionName} count={undefined} />
      {mostPopularActors && <ActorsGallery actors={mostPopularActors} />}
    </>
  );
}
