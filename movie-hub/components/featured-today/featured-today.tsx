import { getTrendingMoviesToday } from "../../app/actions/movie/movie-data";
import HeaderSection from "../movie-details/header-section";
import MoviesCarousel from "../movie-details/movies-carousel";

export default async function FeaturedToday() {
  const trendingMoviesToday = await getTrendingMoviesToday();
  const sectionName = "Featured today";

  return (
    <>
      <HeaderSection sectionName={sectionName} data={undefined} />
      <MoviesCarousel movies={trendingMoviesToday} />
    </>
  );
}
