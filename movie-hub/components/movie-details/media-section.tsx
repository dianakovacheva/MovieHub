import { Suspense } from "react";
import Video from "../video/video";
import { getMovieVideos } from "../../app/actions/movie/movie-data";
import Poster from "./poster";
import posterURL from "../../app/actions/movie/image-API-URL";

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
    <div className="flex flex-col-reverse md:flex-row w-full gap-2 mb-2">
      <Poster data={movie} posterURL={posterURL} path={movie.poster_path} />

      {/* Trailer Video */}
      <Suspense fallback={<p>Loading video...</p>}>
        <Video videoId={movieKey} />
      </Suspense>
    </div>
  );
}
