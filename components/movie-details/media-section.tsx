import { Suspense } from "react";
import Video from "../video";
import { getMovieVideos } from "../../app/actions/movie/movie-data";
import Poster from "../poster";
import { MovieDetailsResponse } from "../../app/actions/movie/types";

export default async function MovieMedia({
  movie,
}: {
  movie: MovieDetailsResponse;
}) {
  const movieVideos = await getMovieVideos(movie.id);
  let movieKey: string = "";

  // Get trailer key
  if (movieVideos) {
    movieVideos.map((movie) => {
      if (movie.type?.toLowerCase() === "trailer" && movie.key) {
        movieKey = movie.key;
      }
    });
  }

  return (
    movie && (
      <div className="flex flex-col-reverse md:flex-row w-full gap-2 mb-2">
        <Poster
          alt={movie.title}
          path={movie.poster_path}
          height={0}
          width={500}
          style={undefined}
          isMovie={true}
        />

        {/* Trailer Video */}
        <Suspense fallback={<p>Loading video...</p>}>
          <Video videoId={movieKey} onReady={undefined} />
        </Suspense>
      </div>
    )
  );
}
