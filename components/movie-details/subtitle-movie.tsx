import convertMinsToHrsMins from "../../app/utils/convert-time";
import movieRealseYear from "../../app/utils/movie";
import MovieGenres from "./movie-genres";

export default async function SubtitleMovie({ movie }) {
  const movieReleaseYear = await movieRealseYear(movie.release_date);

  return (
    <div className="flex flex-wrap">
      <ul className="flex items-center mt-2 font-normal text-base text-zinc-500 dark:text-[#c0bcbc]">
        <li className="mr-4">
          {movieReleaseYear} ({movie.origin_country.join(", ")})
        </li>

        {/* Movie Genres */}
        {movie.genres && (
          <li className="hidden sm:flex list-disc mr-6">
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
