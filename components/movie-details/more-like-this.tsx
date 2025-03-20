import { MoviesProps } from "../../app/actions/movie/definitions";
import HeaderSection from "./header-section";
import MoviesCarousel from "../movies-carousel";

export default function MoreLikeThis({ movies }: MoviesProps) {
  const sectionName: string = "More like this";

  return (
    <>
      <HeaderSection sectionName={sectionName} count={undefined} />
      {movies && <MoviesCarousel movies={movies} />}
    </>
  );
}
