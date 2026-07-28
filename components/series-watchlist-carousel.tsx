import EmptyList from "./empty-list";
import HeaderSection from "./movie-details/header-section";
import SeriesCarousel from "./series-carousel";
import { SeriesProps } from "../app/actions/series/definitions";

export default function SeriesWatchlistCarousel({
  series,
}: {
  series?: SeriesProps["series"];
}) {
  const sectionName = "Series watchlist";
  const listTitle = "No series in your watchlist yet";
  const listParagraph =
    "Add series to your watchlist to keep track of what you want to watch.";
  const buttonText = "Browse series";
  const seriesCount = series?.length ?? 0;

  return (
    <>
      <HeaderSection sectionName={sectionName} count={seriesCount} />
      {series && series.length > 0 ? (
        <SeriesCarousel series={series} />
      ) : (
        <EmptyList
          listTitle={listTitle}
          listParagraph={listParagraph}
          buttonText={buttonText}
          buttonAction="/"
          className="flex flex-col items-center gap-4 flex-wrap"
        />
      )}
    </>
  );
}
