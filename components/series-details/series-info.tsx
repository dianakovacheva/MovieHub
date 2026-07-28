import RateButton from "../rate-button";
import SubtitleSeries from "./subtitle-series";
import PageTitle from "../page-title";
import AddToWatchListButton from "../add-to-watchlist-button";
import { SeriesDetailsResponse } from "../../app/actions/series/types";
import { Star } from "lucide-react";

export default async function SeriesInfo({
  series,
  inWatchlist = false,
}: {
  series: SeriesDetailsResponse;
  inWatchlist?: boolean;
}) {
  const buttonName = "Rate";

  return series ? (
    <div className="flex flex-wrap items-end justify-between w-full">
      {/* Series Info Left Side */}
      <div className="flex flex-col gap-2 md:gap-0 mr-4">
        {series.name && <PageTitle title={series.name} />}
        <SubtitleSeries series={series} />
      </div>

      {/* Series Info Right Side */}
      <div className="right-side flex gap-10 items-start hidden md:flex md:pt-4">
        {/* Rating Info */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 dark:text-[#c0bcbc] text-xs font-bold">
            VIEWERS RATING
          </p>
          <div className="flex items-center gap-2">
            <Star color="#f5c518" fill="#f5c518" width="24" height="24" />

            <div>
              <div className="flex items-center gap-1">
                {series.vote_average ? (
                  <p className="text-xl font-semibold">
                    {series.vote_average.toFixed(1)}
                  </p>
                ) : (
                  <p className="text-xl font-semibold">0</p>
                )}

                <span className="text-base font-normal text-zinc-500 dark:text-[#c0bcbc]">
                  / 10
                </span>
              </div>
              {series.vote_count ? (
                <p className="text-xs font-normal text-zinc-500 dark:text-[#c0bcbc]">
                  {series.vote_count}
                </p>
              ) : (
                <p className="text-xs font-normal text-zinc-500 dark:text-[#c0bcbc]">
                  0
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Your Rating */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 dark:text-[#c0bcbc] text-xs font-bold">
            YOUR RATING
          </p>
          <RateButton buttonName={buttonName} width="24" height="24" />
        </div>

        {/* Watchlist */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 dark:text-[#c0bcbc] text-xs font-bold">
            WATCHLIST
          </p>
          <AddToWatchListButton
            movieId={`tv-${series.id}`}
            movieTitle={series.name}
            initialInWatchlist={inWatchlist}
            showLabel={true}
          />
        </div>
      </div>
    </div>
  ) : (
    <p> No series info to display yet. </p>
  );
}
