import HeaderSection from "./movie-details/header-section";
import MoviesCarousel from "./movie-details/movies-carousel";

export default function ActorKnownFor({ movies }) {
  const sectionName: string = "Known For";

  return (
    <>
      <HeaderSection sectionName={sectionName} data={undefined} />
      <MoviesCarousel movies={movies} />
    </>
  );
}
