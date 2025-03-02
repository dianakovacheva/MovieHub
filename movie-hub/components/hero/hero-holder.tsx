import {
  getMovieVideos,
  getUpcomingMovies,
} from "../../app/actions/movie/movie-data";
import VideoGallery from "../video-gallery";

export default async function HeroSection() {
  const upcomingMovies = await getUpcomingMovies();

  const upcomingMoviesTrailers = [];

  for (const upcomingMovie of upcomingMovies) {
    const movieVideos = await getMovieVideos(upcomingMovie.id);

    movieVideos.map(
      (movie) => (
        (movie["movie_title"] = upcomingMovie.title),
        (movie["movie_id"] = upcomingMovie.id)
      )
    );

    const movieTrailers = movieVideos.filter(
      (movie) =>
        movie.type.toLowerCase() == "trailer" &&
        movie.name.toLowerCase() === "official trailer"
    );

    upcomingMoviesTrailers.push(movieTrailers);
  }

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
