import { MovieDetailsResponse } from "../../app/actions/movie/types";
import convertMinsToHrsMins from "../../app/utils/convert-time";
import MovieGenres from "./movie-genres";

export default async function SubtitleMovie({
  movie,
}: {
  movie: MovieDetailsResponse;
}) {
  const movieReleaseYear =
    movie.release_date && movie.release_date.split("-")[0];

  return (
    <div className="flex flex-wrap">
      <ul className="flex items-center mt-2 font-normal text-base text-zinc-500 dark:text-[#c0bcbc]">
        <li className="mr-6 md:mr-4">
          {movieReleaseYear} ({movie?.origin_country?.join(", ")})
        </li>

        {/* Movie Genres */}
        {movie.genres && (
          <li className="hidden sm:flex mr-6">
            <MovieGenres movieGenres={movie.genres} />
          </li>
        )}

        {/* Movie Runtime */}
        {movie.runtime && (
          <li className="list-disc">{convertMinsToHrsMins(movie.runtime)}</li>
        )}
      </ul>
    </div>
  );
}
