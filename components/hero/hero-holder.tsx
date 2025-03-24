import { UpcomingMoviesTrailersProps } from "../../app/actions/movie/definitions";
import {
  getMovieVideos,
  getUpcomingMovies,
} from "../../app/actions/movie/movie-data";
import VideoGallery from "../video-gallery";

export default async function HeroSection() {
  const upcomingMovies = await getUpcomingMovies();
  const upcomingMoviesTrailers: UpcomingMoviesTrailersProps[] = [];

  if (upcomingMovies && upcomingMovies.length > 0) {
    for (const upcomingMovie of upcomingMovies) {
      const movieVideos = await getMovieVideos(upcomingMovie.id.toString());

      if (movieVideos && movieVideos.length > 0) {
        movieVideos.map(
          (movie) => (
            movie.name?.toLowerCase() === upcomingMovie.title?.toLowerCase(),
            movie.id === upcomingMovie.id.toString()
          )
        );

        let movieTrailers = movieVideos.filter(
          (movie) =>
            movie.type?.toLowerCase() === "trailer" &&
            movie.name?.toLowerCase() === "official trailer"
        );

        movieTrailers = movieTrailers.map((trailer) => ({
          ...trailer,
          movie_title: upcomingMovie.title,
          movie_id: upcomingMovie.id,
        }));

        if (movieTrailers.length > 0) {
          upcomingMoviesTrailers.push(movieTrailers);
        }
      }
    }
  }

  const videoListTitle = (
    <span className="font-bold dark:text-[#f5c518]">Up next</span>
  );

  return (
    <div className="flex flex-col mt-4">
      <VideoGallery
        videos={upcomingMoviesTrailers.flat()}
        videoListTitle={videoListTitle}
        sectionName={undefined}
      />
    </div>
  );
}
