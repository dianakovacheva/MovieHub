import { Suspense } from "react";
import Video from "../video/video";
import MoviePoster from "./movie-poster";
import { getMovieVideos } from "../../app/actions/movies/moviesData";

export default async function MovieMedia({ movie }) {
  const movieVideos = await getMovieVideos(movie.id);
  let movieKey: string = "";

  // Get trailer key
  if (movieVideos) {
    movieVideos.results.map((movie) => {
      if (movie.type.toLowerCase() === "trailer") {
        movieKey = movie.key;
      }
    });
  }

  return (
    <div className="flex flex-col-reverse md:flex-row w-full gap-6 sm:gap-2">
      <MoviePoster movie={movie} />

      {/* Trailer Video */}
      <Suspense fallback={<p>Loading video...</p>}>
        <Video videoId={movieKey} />
      </Suspense>
    </div>
  );
}
