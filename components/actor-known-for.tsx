import { MoviesProps } from "../app/actions/movie/definitions";
import HeaderSection from "./movie-details/header-section";
import MoviesCarousel from "./movies-carousel";

export default function ActorKnownFor({ movies }: MoviesProps) {
  const sectionName: string = "Known For";

  return (
    <>
      <HeaderSection sectionName={sectionName} />
      {movies && <MoviesCarousel movies={movies} />}
    </>
  );
}
