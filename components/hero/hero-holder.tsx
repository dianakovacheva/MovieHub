import {
  getMovieVideos,
  getUpcomingMovies,
} from "../../app/actions/movie/movie-data";
import VideoGallery from "../video-gallery";

export default async function HeroSection() {
  const upcomingMovies = await getUpcomingMovies();
  const upcomingMoviesTrailers = [];

  if (upcomingMovies) {
    for (const upcomingMovie of upcomingMovies) {
      const movieVideos = await getMovieVideos(upcomingMovie.id);

      if (movieVideos) {
        movieVideos.map(
          (movie) => (
            (movie.name = upcomingMovie.title),
            (movie.id = upcomingMovie.id.toString())
          )
        );

        const movieTrailers = movieVideos.filter(
          (movie) =>
            movie.type?.toLowerCase() == "trailer" &&
            movie.name?.toLowerCase() === "official trailer"
        );

        upcomingMoviesTrailers.push(movieTrailers);
      }
    }
  }

  console.log(upcomingMoviesTrailers);

  const videoListTitle = (
    <span className="font-bold text-[#f5c518]">Up next</span>
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
