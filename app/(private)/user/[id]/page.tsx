import DashboardHeader from "../../../../components/dashboard-header";
import convertDateToString from "../../../utils/convert-date-to-string";
import WatchlistCarousel from "../../../../components/watchlist-carousel";
import UserLists from "../../../../components/user-lists";
import { Metadata } from "next";
import { getUserLists } from "../../../actions/list/list-data";
import { getUserSession } from "../../../actions/user/user-data";

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

  return (
    user &&
    user.email && (
      <div className="flex flex-col gap-4 mb-10">
        <DashboardHeader
          userEmail={user.email}
          profileCreatedAt={profileCreatedAt}
        />
        <WatchlistCarousel />
        {userLists && <UserLists userId={user.id} data={userLists} />}
      </div>
    )
  );
}
