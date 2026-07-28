import DashboardHeader from "../../../../components/dashboard-header";
import convertDateToString from "../../../utils/convert-date-to-string";
import WatchlistCarousel from "../../../../components/watchlist-carousel";
import SeriesWatchlistCarousel from "../../../../components/series-watchlist-carousel";
import UserLists from "../../../../components/user-lists";
import UserComments from "../../../../components/user-comments";
import { Metadata } from "next";
import { getUserLists } from "../../../actions/list/list-data";
import { getUserSession } from "../../../actions/user/user-data";
import {
  getWatchlistMovies,
  getWatchlistSeries,
} from "../../../actions/watchlist/watchlist-data";
import { getUserComments } from "../../../actions/comment/comment-data";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUserSession();

  return {
    title: user?.email && `${user.email}'s Profile - MovieHub`,
  };
}

export default async function User() {
  const user = await getUserSession();
  const profileCreatedAt = user
    ? convertDateToString(new Date(user!.createdAt))
    : "";

  const userLists = user && (await getUserLists(user.id));
  const watchlistMovies = await getWatchlistMovies();
  const watchlistSeries = await getWatchlistSeries();
  const userComments = user ? await getUserComments(user.id) : [];

  return (
    user &&
    user.email && (
      <div className="flex flex-col gap-4 mb-10">
        <DashboardHeader
          userEmail={user.email}
          profileCreatedAt={profileCreatedAt}
        />
        <WatchlistCarousel watchlist={watchlistMovies} />
        <SeriesWatchlistCarousel series={watchlistSeries} />
        {userLists && <UserLists userId={user.id} data={userLists} />}
        <UserComments comments={userComments} currentUserId={user.id} />
      </div>
    )
  );
}
