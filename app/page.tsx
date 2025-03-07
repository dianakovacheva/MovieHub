import HeroSection from "../components/hero/hero-holder";
import FeaturedToday from "../components/featured-today/featured-today";
import TopRatedMovies from "../components/top-rated-movies";
import MostPopularCelebrities from "../components/most-popular-celebrities";

export default function Page() {
  return (
    <>
      <HeroSection />

      <FeaturedToday />

      <MostPopularCelebrities />

      <TopRatedMovies />
    </>
  );
}
