import HeaderSection from "./header-section";
import MoviesCarousel from "./movies-carousel";

export default function MoreLikeThis({ movies }) {
  const sectionName: string = "More like this";

  return (
    <>
      <HeaderSection sectionName={sectionName} data={undefined} />
      <MoviesCarousel movies={movies} />
    </>
  );
}
