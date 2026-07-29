import Link from "next/link";
import { getMovieDetails } from "../../app/actions/movie/movie-data";
import { getSeriesDetails } from "../../app/actions/series/series-data";
import Poster from "../poster";
import RateButton from "../rate-button";
import RemoveMovieButton from "./remove-movie-button";
import { Star } from "lucide-react";

const SERIES_PREFIX = "tv-";

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
        {listMovies.map(async (item) => {
          const isSeries = item.movieId.startsWith(SERIES_PREFIX);
          const tmdbId = isSeries
            ? item.movieId.slice(SERIES_PREFIX.length)
            : item.movieId;

          // Normalize movie and series details into a common shape so the card
          // can render either media type from the same list_movies row.
          let detailId: number | undefined;
          let title: string | undefined;
          let posterPath: string | null | undefined;
          let voteAverage: number | undefined;
          let voteCount: number | undefined;
          let dateStr: string | undefined;

          if (isSeries) {
            const show = await getSeriesDetails(tmdbId);
            if (!show) return null;
            detailId = show.id;
            title = show.name;
            posterPath = show.poster_path;
            voteAverage = show.vote_average;
            voteCount = show.vote_count;
            dateStr = show.first_air_date;
          } else {
            const movieData = await getMovieDetails(tmdbId);
            if (!movieData) return null;
            detailId = movieData.id;
            title = movieData.title;
            posterPath = movieData.poster_path;
            voteAverage = movieData.vote_average;
            voteCount = movieData.vote_count;
            dateStr = movieData.release_date;
          }

          if (!title || !detailId) return null;

          const basePath = isSeries ? "tv" : "movie";
          const href = `/${basePath}/${detailId}-${title
            .split(" ")
            .join("-")
            .toLowerCase()}`;

          const movieAddedAt = item.addedAt.toLocaleString("en-GB", {
            timeZone: "Europe/Berlin",
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          return (
            <div key={item.movieId}>
              <li className="list-row">
                <div>
                  <Poster
                    alt={title}
                    path={posterPath}
                    height={200}
                    width={250}
                    style="rounded-lg object-cover shadow-sm w-15 h-25"
                    isMovie={true}
                  />
                </div>
                <div className="list-col-grow flex flex-col gap-2 w-[40vw]">
                  {/* Title */}
                  <Link href={href} className="flex-none">
                    <div className="text-base font-bold">{title}</div>
                  </Link>

                  {/* Rating Info */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-top gap-2 text-sm text-zinc-500 dark:text-[#c0bcbc]">
                      {/* Rating */}
                      <Star
                        color="var(--color-brand-yellow)"
                        fill="var(--color-brand-yellow)"
                        width="16"
                        height="16"
                      />
                      {voteAverage ? (
                        <p>{voteAverage.toFixed(1)}</p>
                      ) : (
                        <p>0</p>
                      )}

                      {voteCount ? <p>({voteCount})</p> : <p>(0)</p>}
                    </div>

                    {/* Rate button */}
                    <RateButton
                      buttonName={buttonName}
                      width="16"
                      height="16"
                      buttonTextSize="text-sm"
                    />
                  </div>

                  {/* Release / air date */}
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {dateStr}
                  </div>
                </div>

                {/* Added to list on */}
                <div className="flex items-center gap-2">
                  {movieAddedAt && (
                    <div className="flex flex-col md:items-center md:justify-center items-start justify-start text-sm font-semibold opacity-60">
                      <span>Added</span>
                      {movieAddedAt}
                    </div>
                  )}

                  <RemoveMovieButton
                    listId={item.listId}
                    movieId={item.movieId}
                    movieTitle={title}
                  />
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
