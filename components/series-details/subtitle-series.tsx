import { SeriesDetailsResponse } from "../../app/actions/series/types";
import MovieGenres from "../movie-details/movie-genres";

export default async function SubtitleSeries({
  series,
}: {
  series: SeriesDetailsResponse;
}) {
  const firstAirYear =
    series.first_air_date && series.first_air_date.split("-")[0];

  const seasonsLabel =
    series.number_of_seasons && series.number_of_seasons > 0
      ? `${series.number_of_seasons} ${
          series.number_of_seasons > 1 ? "seasons" : "season"
        }`
      : null;

  return (
    <div className="flex flex-wrap">
      <ul className="flex items-center mt-2 font-normal text-base text-zinc-500 dark:text-[#c0bcbc]">
        <li className="mr-6 md:mr-4">
          {firstAirYear} ({series?.origin_country?.join(", ")})
        </li>

        {/* Series Genres */}
        {series.genres && (
          <li className="hidden sm:flex mr-6">
            <MovieGenres movieGenres={series.genres} />
          </li>
        )}

        {/* Number of seasons */}
        {seasonsLabel && <li className="list-disc">{seasonsLabel}</li>}
      </ul>
    </div>
  );
}
