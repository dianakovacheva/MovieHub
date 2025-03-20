import EmptyList from "./empty-list";
import HeaderSection from "./movie-details/header-section";
import MoviesCarousel from "./movies-carousel";

export default function WatchlistCarousel({ watchlist }: { watchlist?: [] }) {
  const sectionName = "Watchlist";
  const listTitle = "No Watchlist yet";
  const listParagraph = "Create a watchlist to track movies you want to watch.";
  const buttonText = "Browse popular movies";
  let watchlistCount: number = 0;

  if (watchlist && watchlist.length) {
    watchlistCount = watchlist.length;
  }

  return (
    <>
      <HeaderSection sectionName={sectionName} count={watchlistCount} />
      {watchlist ? (
        <MoviesCarousel movies={watchlist} />
      ) : (
        <>
          <EmptyList
            listTitle={listTitle}
            listParagraph={listParagraph}
            buttonText={buttonText}
            buttonAction={undefined}
            className="flex flex-col items-center gap-4"
          />
        </>
      )}
    </>
  );
}
