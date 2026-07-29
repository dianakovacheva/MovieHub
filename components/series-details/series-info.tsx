import RateButton from "../rate-button";
import SubtitleSeries from "./subtitle-series";
import PageTitle from "../page-title";
import AddToWatchListButton from "../add-to-watchlist-button";
import { SeriesDetailsResponse } from "../../app/actions/series/types";
import { Star } from "lucide-react";

function MetaLabel({ children }: { children: string }) {
  return (
    <p className="text-zinc-500 dark:text-[#c0bcbc] text-xs font-bold tracking-wide uppercase">
      {children}
    </p>
  );
}

export default async function SeriesInfo({
  series,
  inWatchlist = false,
}: {
  series: SeriesDetailsResponse;
  inWatchlist?: boolean;
}) {
  const buttonName = "Rate";

  return series ? (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between w-full">
      <div className="flex flex-col gap-2 md:gap-0 min-w-0 flex-1">
        {series.name && <PageTitle title={series.name} />}
        <SubtitleSeries series={series} />
      </div>

      <div className="flex flex-wrap items-start gap-x-8 gap-y-4 md:pt-1">
        <div className="flex flex-col gap-2">
          <MetaLabel>VIEWERS RATING</MetaLabel>
          <div className="flex items-center gap-2 h-9">
            <Star color="var(--color-brand-yellow)" fill="var(--color-brand-yellow)" width="24" height="24" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1 leading-none">
                <p className="text-xl font-semibold">
                  {series.vote_average ? series.vote_average.toFixed(1) : "0"}
                </p>
                <span className="text-base font-normal text-zinc-500 dark:text-[#c0bcbc]">
                  / 10
                </span>
              </div>
              <p className="text-xs font-normal text-zinc-500 dark:text-[#c0bcbc] mt-1">
                {series.vote_count ?? 0}
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
              movieId={`tv-${series.id}`}
              movieTitle={series.name}
              initialInWatchlist={inWatchlist}
              showLabel={true}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p> No series info to display yet. </p>
  );
}
