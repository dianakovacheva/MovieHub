import HeroSection from "../components/hero/hero-holder";
import FeaturedToday from "../components/featured-today/featured-today";
import TopRatedMovies from "../components/top-rated-movies";
import FeaturedSeries from "../components/featured-series";
import TopRatedSeries from "../components/top-rated-series";
import MostPopularCelebrities from "../components/most-popular-celebrities";
import LoginSuccess from "../components/login-success";
import { SessionProvider } from "next-auth/react";

export default function Page() {
  return (
    <SessionProvider>
      {/* Display welcome message */}
      <LoginSuccess />

      <HeroSection />

      <FeaturedToday />

      <FeaturedSeries />

      <MostPopularCelebrities />

      <TopRatedMovies />

      <TopRatedSeries />
    </SessionProvider>
  );
}
