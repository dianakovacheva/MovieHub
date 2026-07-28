import { Metadata } from "next";
import WatchlistCarousel from "../../../components/watchlist-carousel";
import SeriesWatchlistCarousel from "../../../components/series-watchlist-carousel";
import {
  getWatchlistMovies,
  getWatchlistSeries,
} from "../../actions/watchlist/watchlist-data";
import PageTitle from "../../../components/page-title";

export const metadata: Metadata = {
  title: "Watchlist",
};

export default async function WatchlistPage() {
  const watchlistMovies = await getWatchlistMovies();
  const watchlistSeries = await getWatchlistSeries();

  return (
    <div className="flex flex-col gap-4 mb-10">
      <PageTitle title="Your Watchlist" />
      <WatchlistCarousel watchlist={watchlistMovies} />
      <SeriesWatchlistCarousel series={watchlistSeries} />
    </div>
  );
}
