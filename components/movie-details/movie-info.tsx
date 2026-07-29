import RateButton from "../rate-button";
import SubtitleMovie from "./subtitle-movie";
import PageTitle from "../page-title";
import AddToWatchListButton from "../add-to-watchlist-button";
import { MovieDetailsResponse } from "../../app/actions/movie/types";
import { Star } from "lucide-react";

function MetaLabel({ children }: { children: string }) {
  return (
    <p className="text-zinc-500 dark:text-[#c0bcbc] text-xs font-bold tracking-wide uppercase">
      {children}
    </p>
  );
}

export default async function MovieInfo({
  movie,
  inWatchlist = false,
}: {
  movie: MovieDetailsResponse;
  inWatchlist?: boolean;
}) {
  const buttonName = "Rate";

  return movie ? (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between w-full">
      <div className="flex flex-col gap-2 md:gap-0 min-w-0 flex-1">
        {movie.title && <PageTitle title={movie.title} />}
        <SubtitleMovie movie={movie} />
      </div>

      <div className="flex flex-wrap items-start gap-x-8 gap-y-4 md:pt-1">
        <div className="flex flex-col gap-2">
          <MetaLabel>VIEWERS RATING</MetaLabel>
          <div className="flex items-center gap-2 h-9">
            <Star color="var(--color-brand-yellow)" fill="var(--color-brand-yellow)" width="24" height="24" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1 leading-none">
                <p className="text-xl font-semibold">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "0"}
                </p>
                <span className="text-base font-normal text-zinc-500 dark:text-[#c0bcbc]">
                  / 10
                </span>
              </div>
              <p className="text-xs font-normal text-zinc-500 dark:text-[#c0bcbc] mt-1">
                {movie.vote_count ?? 0}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <MetaLabel>YOUR RATING</MetaLabel>
          <div className="h-9 flex items-center">
            <RateButton buttonName={buttonName} width="24" height="24" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <MetaLabel>WATCHLIST</MetaLabel>
          <div className="h-9 flex items-center">
            <AddToWatchListButton
              movieId={movie.id}
              movieTitle={movie.title}
              initialInWatchlist={inWatchlist}
              showLabel={true}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p> No movie info to display yet. </p>
  );
}
