import { getTopRatedMovies } from "../app/actions/movie/movie-data";
import HeaderSection from "./movie-details/header-section";
import MoviesCarousel from "./movies-carousel";

export default async function TopRatedMovies() {
  const topRatedMovies = await getTopRatedMovies();
  const sectionName = "Top Picks";

  return (
    <>
      <HeaderSection sectionName={sectionName} />
      {topRatedMovies && <MoviesCarousel movies={topRatedMovies} />}
    </>
  );
}
