import EmptyList from "./empty-list";
import HeaderSection from "./movie-details/header-section";
import MoviesCarousel from "./movies-carousel";
import { MoviesProps } from "../app/actions/movie/definitions";

export default function WatchlistCarousel({
  watchlist,
}: {
  watchlist?: MoviesProps["movies"];
}) {
  const sectionName = "Watchlist";
  const listTitle = "No Watchlist yet";
  const listParagraph =
    "Add movies to your watchlist to keep track of what you want to watch.";
  const buttonText = "Browse popular movies";
  const watchlistCount = watchlist?.length ?? 0;

  return (
    <>
      <HeaderSection sectionName={sectionName} count={watchlistCount} />
      {watchlist && watchlist.length > 0 ? (
        <MoviesCarousel movies={watchlist} />
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
