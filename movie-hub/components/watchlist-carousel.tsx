import EmptyList from "./empty-list";
import HeaderSection from "./movie-details/header-section";
import MoviesCarousel from "./movie-details/movies-carousel";

export default function WatchlistCarousel({ watchlist }) {
  const sectionName = "Watchlist";
  const listTitle = "No Watchlist yet";
  const listParagraph = "Create a watchlist to track movies you want to watch.";
  const buttonText = "Browse popular movies";

  return (
    <>
      <HeaderSection sectionName={sectionName} data={watchlist} />
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
