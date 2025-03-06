import EmptyList from "./empty-list";
import HeaderSection from "./movie-details/header-section";
import MoviesCarousel from "./movie-details/movies-carousel";

export default function WatchlistCarousel({ watchlist }) {
  const sectionName = "Watchlist";
  const listTitle = "No Watchlist yet";
  const actionParagraph =
    "Create a watchlist to track movies you want to watch.";
  const callToActionBtnText = "Browse popular movies";

  return (
    <>
      <HeaderSection sectionName={sectionName} data={watchlist} />
      {watchlist ? (
        <MoviesCarousel movies={watchlist} />
      ) : (
        <>
          <EmptyList
            listTitle={listTitle}
            actionParagraph={actionParagraph}
            callToActionBtnText={callToActionBtnText}
            className="flex flex-col items-center gap-4"
            buttonAction={undefined}
          />
        </>
      )}
    </>
  );
}
