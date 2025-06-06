import Link from "next/link";
import { getMovieDetails } from "../../app/actions/movie/movie-data";
import Poster from "../poster";
import RateButton from "../rate-button";
import { Star } from "lucide-react";

type ListMovieCardProps = {
  listMovies: {
    listId: string;
    movieId: string;
    userId: string;
    addedAt: Date;
  }[];
};

export default async function ListMovieCard({
  listMovies,
}: ListMovieCardProps) {
  const buttonName = "Rate";

  return (
    <div className="font-semibold text-zinc-900 dark:text-white">
      <ul key="movies_list" className="list">
        {listMovies.map(async (movie) => {
          const movieData = await getMovieDetails(movie.movieId);
          const movieAddedAt = movie.addedAt
            .toUTCString()
            .slice(0, movie.addedAt.toUTCString.length - 4);
          return movieData ? (
            <div key={movieData.id}>
              {movieData.title && (
                <li className="list-row">
                  <div>
                    <Poster
                      alt={movieData.title}
                      path={movieData.poster_path}
                      height={200}
                      width={250}
                      style="rounded-lg object-cover shadow-sm w-15 h-25"
                      isMovie={true}
                    />
                  </div>
                  <div className="list-col-grow flex flex-col gap-2 w-[40vw]">
                    {/* Movie Title */}
                    <Link
                      href={`/movie/${movieData.id}-${movieData.title
                        .split(" ")
                        .join("-")
                        .toLowerCase()}`}
                      className="flex-none"
                    >
                      <div className="text-base font-bold">
                        {movieData.title}
                      </div>
                    </Link>

                    {/* Movie Rating Info */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-top gap-2 text-sm text-zinc-500 dark:text-[#c0bcbc]">
                        {/* Rating */}
                        <Star
                          color="#f5c518"
                          fill="#f5c518"
                          width="16"
                          height="16"
                        />
                        {movieData.vote_average ? (
                          <p>{movieData.vote_average.toFixed(1)}</p>
                        ) : (
                          <p>0</p>
                        )}

                        {movieData.vote_count ? (
                          <p>({movieData.vote_count})</p>
                        ) : (
                          <p>(0)</p>
                        )}
                      </div>

                      {/* Rate movie button */}
                      <RateButton
                        buttonName={buttonName}
                        width="16"
                        height="16"
                        buttonTextSize="text-sm"
                      />
                    </div>

                    {/* Release date */}
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {movieData.release_date}
                    </div>
                  </div>

                  {/* Movie added to list on */}
                  {movieAddedAt && (
                    <div className="flex flex-col md:items-center md:justify-center items-start justify-start text-sm font-semibold opacity-60">
                      <span>Added</span>
                      {movieAddedAt}
                    </div>
                  )}
                </li>
              )}
            </div>
          ) : null;
        })}
      </ul>
    </div>
  );
}
