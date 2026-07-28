import { Metadata } from "next";
import WatchlistCarousel from "../../../components/watchlist-carousel";
import SeriesWatchlistCarousel from "../../../components/series-watchlist-carousel";
import {
  getWatchlistMovies,
  getWatchlistSeries,
} from "../../actions/watchlist/watchlist-data";
import PageTitle from "../../../components/page-title";
import { getUserSession } from "../../actions/user/user-data";
import { LoginForm } from "../../../components/auth/login/login-form";
import { SubmitButton } from "../../../components/auth/submit-button";
import AuthPanel from "../../../components/auth/auth-panel";

export const metadata: Metadata = {
  title: "Watchlist",
};

export default async function WatchlistPage() {
  const user = await getUserSession();

  if (!user) {
    return (
      <AuthPanel
        title="Sign in"
        subtitle="Sign in to view and manage your Watchlist."
        alternateHref="/register"
        alternateLabel="Create a MovieHub account"
        alternatePrompt="New to MovieHub?"
        alternateCta="Create an account"
      >
        <LoginForm redirectTo="/watchlist">
          <SubmitButton>Sign in</SubmitButton>
        </LoginForm>
      </AuthPanel>
    );
  }

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
