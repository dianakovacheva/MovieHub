import RateButton from "../rate-button";
import SubtitleMovie from "./subtitle-movie";
import PageTitle from "../page-title";
import { MovieDetailsResponse } from "../../app/actions/movie/types";
import { Star } from "lucide-react";

export default async function MovieInfo({
  movie,
}: {
  movie: MovieDetailsResponse;
}) {
  const buttonName = "Rate";

  return movie ? (
    <div className="flex flex-wrap items-end justify-between w-full">
      {/* Movie Info Left Side */}
      <div className="flex flex-col gap-2 md:gap-0 mr-4">
        {movie.title && <PageTitle title={movie.title} />}
        <SubtitleMovie movie={movie} />
      </div>

      {/* Movie Info Right Side */}
      <div className="right-side flex gap-10 items-start hidden md:flex md:pt-4">
        {/* Rating Info */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 dark:text-[#c0bcbc] text-xs font-bold">
            VIEWERS RATING
          </p>
          <div className="flex items-center gap-2">
            <Star color="#f5c518" fill="#f5c518" width="24" height="24" />

            {/* Rating */}
            <div>
              <div className="flex items-center gap-1">
                {movie.vote_average ? (
                  <p className="text-xl font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </p>
                ) : (
                  <p className="text-xl font-semibold">0</p>
                )}

                <span className="text-base font-normal text-zinc-500 dark:text-[#c0bcbc]">
                  / 10
                </span>
              </div>
              {movie.vote_count ? (
                <p className="text-xs font-normal text-zinc-500 dark:text-[#c0bcbc]">
                  {movie.vote_count}
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

        {/* Popularity Info */}
        {/* <div className="flex flex-col gap-2">
          <p className="text-[#c0bcbc] text-xs font-bold">POPULARITY</p>
          <p className="font-bold text-2xl">{movie.popularity.toFixed(2)}</p>
        </div> */}
      </div>
    </div>
  ) : (
    <p> No movie info to display yet. </p>
  );
}
