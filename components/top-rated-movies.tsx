import { getTopRatedMovies } from "../app/actions/movie/movie-data";
import HeaderSection from "./movie-details/header-section";
import MoviesCarousel from "./movies-carousel";

export default async function TopRatedMovies() {
  const topRatedMovies = await getTopRatedMovies();
  const sectionName = "Top Picks";

  return (
    <>
      <h3 className="text-[#f5c518] text-[2rem] font-extrabold mt-8">
        What to watch
      </h3>
      <HeaderSection sectionName={sectionName} />
      {topRatedMovies && <MoviesCarousel movies={topRatedMovies} />}
    </>
  );
}
