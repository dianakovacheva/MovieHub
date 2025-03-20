import { auth } from "../../../auth";
import DashboardHeader from "../../../components/dashboard-header";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema";
import convertDateToString from "../../utils/convert-date-to-string";
import WatchlistCarousel from "../../../components/watchlist-carousel";
import UserLists from "../../../components/user-lists";
import { Metadata } from "next";
import { getUserLists } from "../../actions/list/list-data";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await auth();
  const userEmail = session?.user?.email ?? "";
  const userId = session?.user?.id ?? "";

  const user = await db.query.users.findFirst({
    where: eq(users.email, userEmail),
  });

  const profileCreatedAt = user
    ? convertDateToString(new Date(user!.createdAt))
    : "";

  const userLists = await getUserLists(userId);

  return (
    user &&
    user.email && (
      <div className="flex flex-col gap-4 mb-10">
        <DashboardHeader
          userEmail={user.email}
          profileCreatedAt={profileCreatedAt}
        />
        <WatchlistCarousel watchlist={undefined} />
        {userLists && <UserLists lists={userLists} />}
      </div>
    )
  );
}
